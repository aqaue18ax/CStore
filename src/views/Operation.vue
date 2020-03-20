<template>
  <div class="operation" v-cloak>
    <navBar :title="$route.meta.title" left-arrow @click-left="$router.back()" class="font-regular"></navBar>

    <dropdown-menu>
      <dropdown-item v-model="module_id" :options="option" @change="item"/>
      <dropdown-item :title="month" ref="item">
        <DatetimePicker
          v-model="currentDate"
          ref="datePicker"
          :show-toolbar="false"
          type="year-month"
          :max-date="maxDate"
        />
        <button class="btn bg-blue" @click="datePicker">确认</button>
      </dropdown-item>
    </dropdown-menu>

    <cell-group class="padding-top-sm">
      <ve-ring :data="{columns, rows}" :colors="colors" :legend-visible="false"/>
    </cell-group>

    <div class="cards grid col-2 font-medium">
      <div v-for="row in rows" :key="row.id">
        <div class="card">
          <div class="title flex text-df padding-sm">
            <div class="color" :style="{background: row.color}"></div>
            <span>{{row.name}}</span>
          </div>
          <div class="padding-lr-sm padding-bottom-sm">
            <div class="money text-lg">{{row.operation}}元</div>
            <div class="flex align-center">
              <div class="progress">
                <span :style="{width: row.percent, background: row.color}"></span>
              </div>
              <div class="percent text-sm">{{row.percent}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  NavBar,
  CellGroup,
  DropdownMenu,
  DropdownItem,
  DatetimePicker
} from "vant";
import VeRing from "v-charts/lib/ring.common";

export default {
  data() {
    return {
      module_id: 1,
      maxDate: new Date(),
      option: [{text: '专业市场', value: 1}, {text: '正泰门店', value: 21}],
      currentDate: new Date(),
      colors: [],
      columns: ["name", "operation"],
      rows: []
    };
  },
  components: {
    VeRing,
    CellGroup,
    NavBar,
    DropdownMenu,
    DropdownItem,
    DatetimePicker
  },
  computed: {
    month() {
      return (
        this.currentDate.getFullYear() + "-" + (this.currentDate.getMonth() + 1)
      );
    }
  },
  methods: {
    item(id) {
      this.module_id = parseInt(id) || 1;
      this.search({id: this.module_id, month: this.month})
    },
    datePicker() {
      this.search({id: this.module_id, month: this.month})
      this.$refs.item.toggle(false)
    },
    search(params) {
      this.$http
        .get(`api/module/${this.module_id}/operation`, params)
        .then(data => {
          let total = 0;
          data.map(m => {
            this.colors.push(m.color);
            total += m.operation;
          });

          data.map(m => {
            m.percent = ((m.operation / total) * 100 || 0).toFixed(2) + "%";
          });

          this.rows = data;
        });
    }
  },
  async created() {
    await this.search({ id: this.module_id, month: this.month });
  }
};
</script>

<style scoped>
.cards {
  background: #fff;
}

.card {
  border: 1px solid #efefef;
}

.progress {
  overflow: hidden;
  height: 10px;
  background-color: #ebeef5;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
}

.progress span {
  width: 0;
  height: 100%;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-items: flex-end;
  -webkit-justify-content: space-around;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  font-size: 10px;
  color: var(--white);
  -webkit-transition: width 0.6s ease;
  -o-transition: width 0.6s ease;
  transition: width 0.6s ease;
}

.percent {
  margin-left: 16px;
}

.btn {
  height: 72px;
  width: 100%;
  border: none;
}

.color {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

.operation {
  height: 100%;
}

.van-nav-bar {
  line-height: 48px;
  background: #34569b;
}

.van-nav-bar__title {
  color: #fff;
}

.van-nav-bar .van-icon {
  color: #fff;
}
</style>