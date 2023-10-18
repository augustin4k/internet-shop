const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

//#region FOR HANDLING CART DATABASE
// create with force private folder which is needed in future for running of the project
const folderPath = 'private';
// Check if the folder exists
if (!fs.existsSync(folderPath)) {
  // If it doesn't exist, create the folder
  fs.mkdirSync(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating folder:', err);
    } else {
      console.log('Folder created successfully.');
    }
  });
} else {
  console.log('Folder already exists.');
}

const pathToCart = 'private/cart.json';

app.get('/checkAndCreateCartFile', (req, res) => {
  const fileData = '[]'; // Data to write to the file

  if (!fs.existsSync(pathToCart)) {
    fs.writeFileSync(pathToCart, fileData, 'utf-8');
    res.json({ message: 'File created.' });
  } else {
    res.json({ message: 'The file already exists.' });
  }
});

app.get('/modifyCart', (req, res) => {
  const action = req.query.action; // Action can be "add" or "delete"
  const newData = req.query.product; // Get the data from the request body

  // Read the existing JSON data from the file
  const existingData = fs.readFileSync(pathToCart, 'utf-8');

  // Parse the data into a JavaScript array
  let dataArray = JSON.parse(existingData);

  if (action === 'add') {
    const existingObject = dataArray.find((item) => item.id === newData.id);

    if (existingObject) {
      // If it exists, increment the count
      existingObject.count += 1;
    } else {
      // If it doesn't exist, add the new object to the array
      newData.count = 1; // Initialize the count property
      dataArray.push(newData);
    }
  } else if (action === 'delete') {
    const index = dataArray.findIndex((item) => item.id === newData.id);

    if (index !== -1) {
      if (dataArray[index].count > 1) {
        // If count is greater than 1, decrement the count
        dataArray[index].count -= 1;
      } else {
        // If count is 1, remove the item from the array
        dataArray.splice(index, 1);
      }
    }
  }

  // Write the updated array back to the file
  fs.writeFileSync(pathToCart, JSON.stringify(dataArray, null, 2), 'utf-8');

  res.json({ message: 'Finish updating.' });
});

// Define a route to read data from the JSON file
app.get('/getOrderCartProducts', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(pathToCart, 'utf-8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error reading the data file' });
  }
});
//#endregion

//#region HANDLING OF DATABASE REGARDING PRODUCTS AND SHOPS
// Define a route to read data from the JSON file
const pathDb = 'private/db/db.json';
app.get('/getShops', (req, res) => {
  try {
    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync(pathDb, 'utf-8')).db;

    // Check if the "partners" key exists
    if ('partners' in jsonData) {
      const { partners } = jsonData;

      // Iterate through each partner and calculate the minimal price
      for (const partner of partners) {
        const partnerProducts = JSON.parse(
          fs.readFileSync(`private/db/${partner.products}`, 'utf-8')
        );
        let minPrice = Infinity;
        for (const product of partnerProducts) {
          if (product.price < minPrice) {
            minPrice = product.price;
          }
        }
        partner.price = minPrice;
      }

      const shops = partners;

      res.json(shops);
    } else {
      res
        .status(400)
        .json({ error: 'File does not contain a "partners" key.' });
    }
  } catch (error) {
    console.error(`Error reading and organizing data: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/findShops', (req, res) => {
  const searchString = req.query.searchString.toLocaleLowerCase(); // The string to search for

  try {
    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync(pathDb, 'utf-8')).db;

    if ('partners' in jsonData) {
      const { partners } = jsonData;

      // Create an array to store found shops
      const foundShops = [];

      // Iterate through each partner and check for a match
      for (const partner of partners) {
        if (partner.name && partner.name.toLowerCase().includes(searchString)) {
          foundShops.push(partner);
          continue;
        }

        // Check if there's a products key and associated link
        if (partner.products) {
          const partnerProducts = JSON.parse(
            fs.readFileSync(`private/db/${partner.products}`, 'utf-8')
          );
          for (const product of partnerProducts) {
            if (
              (product.description &&
                product.description.toLowerCase().includes(searchString)) ||
              (product.name &&
                product.name.toLowerCase().includes(searchString))
            ) {
              // If the product matches, add the shop to the found shops
              foundShops.push(partner);
              break; // Stop searching for this shop once a match is found
            }
          }
        }
      }

      res.json(foundShops);
    } else {
      res
        .status(400)
        .json({ error: 'File does not contain a "partners" key.' });
    }
  } catch (error) {
    console.error(`Error searching for shops: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getProducts', (req, res) => {
  const linkToProducts = `private/db/${req.query.link}`; // The string to search for

  try {
    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync(linkToProducts, 'utf-8'));
    res.json(jsonData);
  } catch (error) {
    console.error(`Error searching for shops: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//#endregion

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
