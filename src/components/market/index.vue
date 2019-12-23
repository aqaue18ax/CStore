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
      // this.$root.zoom = 14;
      await this.$http.get(`/store/${id}`).then(data => {
        data.children.map(store => {
          store.events = {
            click: () => {
              this.pin(store);
            }
          };
        });

        this.store = data;

        let children = []
        data.children.map(c => {
          if (c.children) {
            children = children.concat(c.children);
          } else {
            children = children.concat(c);
          }
        })


        this.$root.range = data.range
        this.$root.stores = children;
        // this.$root.zoom = 18;
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
};
</script>
