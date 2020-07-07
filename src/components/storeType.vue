<template>
  <div class="storeFilter" :class="{radius}">
    <div :class="['content', showFilter ? 'showAni' : '']">
      <icon class="circle" name="wap-home-o" @click="showFilter = !showFilter" v-show="!showFilter" />
      <RadioGroup v-model="radio" v-show="showFilter" @change="onChange" >
        <Radio class="radio" v-for="item in displayColumns" :name="item.value" :key="item.name">
          {{ item.name}}
        </Radio>
      </RadioGroup>
    <Button class="btn bg-blue text-white" type="info" plain  @click="showFilter = !showFilter" v-show="showFilter" >关闭</button>
      <!-- <icon class="circle" name="cross"  @click="showFilter = !showFilter" v-show="showFilter" /> -->
    </div>
    <!-- <div class="flex padding-tb-sm toolbar justify-between align-center margin-lr">
      <span>门店类型</span>
      <icon name="cross" @click="$emit('onHide')" />
    </div>
    <picker
      :columns="displayColumns"
      ref="picker"
      valueKey="name"
      @change="onChange"
      :item-height="40"
    />
    <button class="btn bg-blue" @click="confirm" :class="{radius}">确认</button> -->
  </div>
</template>

<style scoped>
.picker {
  width: 100%;
}

.content{
  margin: 0.5rem;
  float: right;
  width: 60px;
  max-height: 60px;
  border-radius: 5px;
  background: #fff;
  color: #ccc;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  text-align: center;
  font-size: 1rem;
  transition: max-height 0.5s;
  overflow: hidden;
}

.circle {
  font-size: 1.5rem;
}

.radio{
  margin: 5px;
}

.showAni {

  width: 200px;
  /* height: auto; */
  max-height: 500px;
  border-radius: 5px;
  font-size: 0.5rem;
  /* animation: change 1s 1; */
}

@keyframes change {
  0% {
    border-radius: 50%;
  }
  100% {
    border-radius: 0%;
  }
}

.toolbar {
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.btn {
  height: 72px;
  width: 100%;
  border: none;
}

.btn.radius {
  border-radius: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>

<script>
import { Radio, RadioGroup, Icon, Button  } from "vant";

export default {
  components: {
    Icon,
    Radio,
    RadioGroup,
    Button 
  },
  props: {
    value: String,
    typeList: {
      type: Object,
      default: () => ({})
    },
    radius: Boolean
  },

  data() {
    return {
      radio: "",
      showFilter: false,
      codes: this.value,
      columns: [{ values: [] }, { values: [] }, { values: [] }]
    };
  },

  computed: {
    displayColumns() {
      return this.typeList.item;
    }
  },

  mounted() {},

  methods: {
    confirm() {
      this.$emit("confirm", this.$refs.picker.getValues());
    },
    onChange(values) {
      this.codes = values;
      const arr = values == "" ? [] : values.split(',');
        this.$store.dispatch('setFilter', arr)
    }
  }
};
</script>

