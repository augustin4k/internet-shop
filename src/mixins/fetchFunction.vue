<script>
export default {
  methods: {
    async fetchData(url) {
      return fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.error('Failed to fetch data');
            return Promise.reject('Failed to fetch data');
          }
        });
    }
  }
}
</script>