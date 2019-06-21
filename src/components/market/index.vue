<template>
  <router-view/>
</template>

<script>
export default {
  data () {
    return {
      store: {}
    }
  },
  methods: {
    async find(id) {
      this.isShow = false;
      await this.$http.get(`/store/${id}`).then(data => {
        data.children.map(store => {
          store.events = {
            click: () => {
              this.pin(store);
            }
          };
        });

        this.store = data;

        this.$root.stores = data.children;
        this.$root.zoom = 14;
        this.$root.center = data.coordinate;
      });
      this.isShow = true;
    },
    pin(store) {
      if (store.type == "store") {
        this.$router.push(
          `/home/market/${this.$route.params.id}/store/${store.id}`
        );
      }
    }
  }
  // async created() {
  //   const id = this.$route.params.id;
  //   await this.find(id);
  // }
};
</script>
