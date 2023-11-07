<template>
  <div style="display: flex; justify-content: center;">
    <slot-machine class="myMachine" :colCount="1" :moveTime="4" :list="foodlist" @onend="onMachineEnd"
      @onerror="onMachineError" ref="machine" />
  </div>
</template>

<script>
export default {
  props: {
    foodlist: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.machineGo()
  },
  updated() {
    this.machineGo()
  },
  data() {
    return {
    };
  },
  methods: {
    rndNum(min, max) {
      if (min > max) min = [max, (max = min)][0];
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // 老虎机
    machineGo() {
      console.log(this.foodlist)
      this.$refs.machine.go([this.rndNum(0, this.foodlist.length - 1)]);
    },
    onMachineEnd(val) {
    },
    onMachineError(data) {
    },
  },
}
</script>

<style>
/* 宽度大小 */
.myMachine {
  width: 600px;
}

/* 老虎机格子的样式 */
.slotMachine__col {
  height: 160px !important;
  border-radius: 20px;
  background-color:cornflowerblue;
  color:#ffffff
}

/* 奖品item的样式 */
.slotMachine__li {
  height: 160px !important;
  font-size:50px;
}

/* 图片样式 */
.slotMachine__image {
  width: 160px;
  height: 160px;
}

/* 文字样式 */
.slotMachine__label {
}
</style>
