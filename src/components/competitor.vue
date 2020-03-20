<template>
  <div class="competitor">
    <div class="header flex justify-between">
      <div class="name text-bold">{{data.name}}</div>
      <div class="sale">
        预估销售额：
        <span>{{addSaleUnit}}</span>
      </div>
    </div>
    <div class="padding-tb-sm">{{data.introduce}}</div>
    <div>
      <div class="red padding-bottom-xs">
        一级数量：
        <span>{{data.one_count}}</span>
      </div>
      <div class="red padding-bottom-xs">
        二级数量：
        <span>{{data.two_count}}</span>
      </div>
      <div class="red padding-bottom-xs">
        户外广告：
        <span>{{data.outdoor}}</span>
      </div>
      <div class="red padding-bottom-xs">
        终端形象建设：
        <span>{{data.content}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { addChineseUnit } from "@/utils/utils";
export default {
  props: {
    data: Object
  },

  computed: {
    addSaleUnit() {
      return addChineseUnit(this.data.money, 1);
    }
  }
};
</script>

<style scoped>
.sale span {
  color: #f34e4a;
}

.body {
  padding: 25px 0;
}

.name {
  font-size: 26px;
  color: #34579b;
}

.red span {
  color: #f34e4a;
}
</style>
