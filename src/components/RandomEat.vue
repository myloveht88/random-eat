<script setup lang="ts">
import { ref } from 'vue'
import CountUp from 'vue-countup-v3'
import { ElMessage } from 'element-plus'
import { Plus, Money, ForkSpoon } from '@element-plus/icons-vue'

import SlotMachine from './SlotMachine.vue'

defineProps<{
  msg: string
  randomAmt: number
  newFoodList: string
}>()


const sliderValue = ref(0)
const randomAmt = ref(0)
const newFoodList = ref('')
const randomFood = ref('')
const randomfoodlist = ref([])
const amtdialogVisible = ref(false)
const fooddialogVisible = ref(false)
const resdialogVisible = ref(false)
const checkboxGroup = ref(['火锅'])
const cities = ref(['火锅', '烧烤', '路边摊', '西贝', '青花椒鱼', '杭帮菜', '川菜', '湖南菜'])

const getAmt = (m: number) => {
  if (m < 10) {
    ElMessage.error('金额不能小于10元')
    return
  }
  amtdialogVisible.value = true
  randomAmt.value = Math.floor(Math.random() * (m - 0 + 1) + 0 - 1);
  while (randomAmt.value <= 10) {
    randomAmt.value = Math.floor(Math.random() * (m - 0 + 1) + 0 - 1);
  }
  console.log(randomAmt.value)
}

const getrandomfood = () => {
  var foodindex = Math.floor(Math.random() * (checkboxGroup.value.length - 0 + 1) + 0 - 1);
  while (foodindex < 0) {
    foodindex = Math.floor(Math.random() * (checkboxGroup.value.length - 0 + 1) + 0 - 1);
  }
  console.log(checkboxGroup.value[foodindex])
  randomFood.value = checkboxGroup.value[foodindex]
}

const getfood = () => {
  fooddialogVisible.value = true
  console.log(checkboxGroup.value.length)
  randomfoodlist.value = []
  checkboxGroup.value.forEach(element => {
    randomfoodlist.value.push({label:element})
  });
  console.log(randomfoodlist.value)
  // getrandomfood()
}
const addFood = () => {
  if (cities.value.includes(newFoodList.value)) {
    ElMessage.error('随机食物已经包含' + newFoodList.value)
    return
  } else if (newFoodList.value === '') {
    ElMessage.error('请添加想吃的食物' + newFoodList.value)
    return
  } else {
    cities.value.push(newFoodList.value)
    checkboxGroup.value.push(newFoodList.value)
  }
  console.log(randomfoodlist.value)
}

const getres = () => {
  fooddialogVisible.value = false
  resdialogVisible.value = true
}



</script>

<template>
  <div class="common-layout">
    <el-container class="main">
      <el-header class="blink"></el-header>
      <el-main style="margin-top:30px">
        <div class="upmain">
          <div>
            <el-card class="upcard">
              <el-row>
                <el-text class="amtrange" style="font-size: 30px;">请选择金额范围: 0元-{{ sliderValue
                }}元</el-text>
              </el-row>
              <el-row style="margin-top: 30px;">
                <div class="slider-demo-block">
                  <el-slider v-model="sliderValue" show-input style="width: 600px;" max="100" size="large" />
                </div>
              </el-row>
            </el-card>
          </div>
          <div>
            <el-dialog v-model="amtdialogVisible" title="今天能吃的随机金额是人均:" width="50%" center align-center
              style="border-radius:20px">
              <el-row>
                <el-col :span="12">
                  <count-up :end-val="randomAmt"
                    style="background-color: cornflowerblue;height: 150px;width: 400px;font-size: 100px;text-align: center;color: aliceblue;"></count-up>
                </el-col>
                <el-col :span="1">
                  <el-text style="font-size: 40px;margin-left: 500px;">元</el-text>
                </el-col>
              </el-row>
            </el-dialog>
            <el-row>
              <div style="margin-top: 20px;">
                <el-button class="btn" type="primary" :icon="Money" @click="getAmt(sliderValue)" size="large"></el-button>
              </div>
            </el-row>
          </div>
        </div>
        <!-- <el-divider /> -->
        <div class="downmain">
          <el-card class="downcard">
            <el-row>
              <div>
                <el-text class="foodtext" style="font-size: 30px;">请选择随机食物:</el-text>
              </div>
            </el-row>
            <el-row style="margin-top: 20px;">
              <div>
                <el-checkbox-group v-model="checkboxGroup" size="large">
                  <el-checkbox-button v-for="city in cities" :key="city" :label="city">
                    {{ city }}
                  </el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-row>
            <el-row style="margin-top: 20px;">
              <div>
                <el-form>
                  <el-form-item label="新增食物:">
                    <el-input v-model="newFoodList" placeholder="新增食物" style="width: 300px;" />
                    <el-button type="primary" @click="addFood" :icon="Plus" style="margin-left: 10px;"></el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-row>
          </el-card>
          <el-row>
            <div>
              <el-button class="btn" type="primary" :icon="ForkSpoon" @click="getfood" size="large"
                style="margin-top:20px"></el-button>
              <div>
                <el-dialog v-model="fooddialogVisible" title="今天吃的随机食物是:" width="60%"
                  style="text-align: center;border-radius:20px" align-center>
                  <!-- <span class="foodres" style="font-size: 50px;color:aliceblue;background-color: cornflowerblue;">{{
                    randomFood }}</span> -->
                  <el-row style="height:300px">
                    <SlotMachine :foodlist="randomfoodlist" />
                  </el-row>
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button type="success" size="large">
                        人均{{ randomAmt }}元
                      </el-button>
                    </span>
                  </template>
                </el-dialog>
              </div>
            </div>
          </el-row>
          <el-dialog v-model="resdialogVisible" style="text-align: center;border-radius:20px" align-center>
            <div>
              <el-result icon="success" :title="randomFood" :sub-title="'人均' + randomAmt + '元'">
              </el-result>
            </div>
          </el-dialog>
        </div>
      </el-main>
      <el-footer class="footer">
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>
@keyframes foodres {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}


.blink {
  background-image: url(src/assets/header.png);
  width: 46%;
  height: 130px;
  margin: 0 auto;
  background-size: cover;
  top: 0;
}

@keyframes flowCss {
  0% {
    /* 移动背景位置 */
    background-position: 0 0;
  }

  100% {
    background-position: -400% 0;
  }
}

.amtrange {
  width: 12em;
  animation: typingWords 3s steps(12), cursor 0.5s steps(1) infinite;
  white-space: nowrap;
  overflow: hidden;
  border-right: 1px solid #000;
}



@keyframes typingWords {
  0% {
    width: 0;
  }

  100% {
    width: 100;
  }
}

@keyframes cursor {
  50% {
    border-color: transparent;
  }
}

.foodres {
  animation: foodres 2s;
}

.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}

.el-row {
  flex-direction: row-reverse;
  flex-wrap: warp;
  align-content: center;
  justify-content: center;
}

.el-checkbox-group,
.el-form {
  font-weight: bolder;
}

.common-layout::before {
  width: 100%;
  height: 100%;
  /* background-image: url(src/assets/bg.png); */
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: -1;
  opacity: 38%;
  filter: opacity(38%);
}

.btn {
  height: 60px;
  /* padding: 0 10px; */
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
  background-color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  color: cornflowerblue;
  box-shadow: 3px 3px 13px rgba(0, 0, 0, 0.2),
    -3px -3px 13px rgba(255, 255, 255, 0.8),
    inset 0px 0px 0px rgba(0, 0, 0, 0.2),
    inset 0px 0px 0px rgba(255, 255, 255, 0.8);
  transition: 0.2s;
}

.btn:hover {
  color: cornflowerblue;
  background-color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2),
    0px 0px 0px rgba(255, 255, 255, 0.8),
    inset 3px 3px 9px rgba(0, 0, 0, 0.2),
    inset -3px -3px 9px rgba(255, 255, 255, 0.8);
  transform: translateY(3px) scale(0.98);
}

.main {
  height: 940px;
  background-color: #f7f7f7
}

.downmain {
  /* background-image: url(src/assets/bg.png);
  background-size: cover;
  z-index: -999;
  opacity: 60%;
  filter: opacity(38%); */
  background-color: #f7f7f7;
}

.upcard {
  width: 40%;
  height: 150px;
  margin: 0 auto;
  top: 0;
  border-radius: 20px;
}

.downcard {
  width: 70%;
  height: 220px;
  margin: 0 auto;
  border-radius: 20px;
  margin-top: 55px;
  background-color: #ffffff;
}

.footer {
  height: 80px;
  background-image: url(src/assets/bg3.png);
  background-size: contain;
}
</style>
