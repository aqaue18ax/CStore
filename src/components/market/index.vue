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
      await this.$http.get(`api/store/${id}`).then(async data => {
        data.establishment_time = new Date(data.establishment_time * 1000).Format('yyyy年MM月dd日')

        if (data.competitors) {
          data.competitors = JSON.parse(data.competitors)
        } else {
          data.competitors = []
        }

        await this.$http.get(`api/file/${data.plan_file_id}`).then(v => {
          data.plan = v.url
        })

        await this.$http.get(`api/market/statistics/${data.id}`).then(v => {
          data.area = v
        })

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
        // this.$root.stores = children;
        this.$store.dispatch('setStores', children)
        // this.$root.zoom = 18;
        this.$root.center = data.coordinate;
      });

      this.isShow = true;
    },
    pin(store) {
      if (store.type == "store") {
        this.$store.dispatch('setSelectStore', store)
        this.$router.push(
          `/home/market/${this.$route.params.id}/store/${store.id}`
        );
      }
    }
  }
};
</script>
