<script setup lang="ts">
import { ref } from 'vue'
import CountUp from 'vue-countup-v3'
import { ElMessage } from 'element-plus'
import { Plus,Money,ForkSpoon } from '@element-plus/icons-vue'

defineProps<{
  msg: string
  randomAmt: number
  newFoodList: string
}>()


const sliderValue = ref(0)
const randomAmt = ref(0)
const newFoodList = ref('')
const randomFood = ref('')
const amtdialogVisible = ref(false)
const fooddialogVisible = ref(false)
const checkboxGroup = ref(['火锅'])
const cities = ref(['火锅', '烧烤', '路边摊', '西贝', '青花椒鱼', '杭帮菜', '川菜', '湖南菜'])

const getAmt = (m: number) => {
  if (m === 0) {
    ElMessage.error('金额不能为0')
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
  getrandomfood()
}
const addFood = () => {
  if (cities.value.includes(newFoodList.value)) {
    ElMessage.error('随机食物已经包含' + newFoodList.value)
    return
  } else {
    cities.value.push(newFoodList.value)
    checkboxGroup.value.push(newFoodList.value)
  }
  console.log(cities)
}


</script>

<template>
  <div class="common-layout">
    <el-container class="main">
      <el-header class="blink"></el-header>
      <el-main style="margin-top:60px">
        <div>
          <el-row>
            <el-text class="amtrange" style="font-size: 30px;color:cornflowerblue;">请选择金额范围: 0元-{{ sliderValue
            }}元</el-text>
          </el-row>
          <el-row style="margin-top: 30px;">
            <div class="slider-demo-block">
              <el-slider v-model="sliderValue" show-input style="width: 600px;" max="100" size="large" />
            </div>
          </el-row>
        </div>
        <div>
          <el-dialog v-model="amtdialogVisible" title="今天能吃的随机金额是人均:" width="50%" center align-center>
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
            <div style="margin-top: 30px;">
              <el-button type="primary" :icon="Money" @click="getAmt(sliderValue)" size="large">获取金额</el-button>
            </div>
          </el-row>
        </div>
        <el-divider />
        <div>
          <el-row>
            <div>
              <el-text class = "foodtext" style="font-size: 30px;color:cornflowerblue;">请选择随机食物:</el-text>
            </div>
          </el-row>
          <el-row style="margin-top: 30px;">
            <div>
              <el-checkbox-group v-model="checkboxGroup" size="large">
                <el-checkbox-button v-for="city in cities" :key="city" :label="city">
                  {{ city }}
                </el-checkbox-button>
              </el-checkbox-group>
            </div>
          </el-row>
          <el-row style="margin-top: 30px;">
            <div>
              <el-form>
                <el-form-item label="新增食物:">
                  <el-input v-model="newFoodList" placeholder="新增食物" style="width: 300px;" />
                  <el-button @click="addFood" :icon="Plus" style="margin-left: 10px;"></el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-row>
          <el-row>
            <div>
              <el-button type="primary" :icon="ForkSpoon" @click="getfood" size="large">获取食物</el-button>
            </div>
          </el-row>
          <el-row>
            <div style="margin-top:30px">
              <el-result icon="success" :title="randomFood" :sub-title="'人均' + randomAmt + '元'">
              </el-result>
            </div>
          </el-row>
        </div>
        <div>
          <el-dialog v-model="fooddialogVisible" title="今天吃的随机食物是:" width="60%" style="text-align: center;" align-center>
            <span class="foodres" style="font-size: 50px;color:aliceblue;background-color: cornflowerblue;">{{
              randomFood }}</span>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="fooddialogVisible = false">
                  去吃吧
                </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
/* @keyframes blink {
  0% {
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
} */

@keyframes foodres {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

/* .blink {
  background: linear-gradient(135deg,
      #a3d0bd,
      #cb9db9 25%,
      #6fb0c1 50%,
      #a9a681 55%,
      #2cc4e0 60%,
      #ae89cf 80%,
      #c28794 95%,
      #7eb8ad);
  background-clip: text;
  background-size: 200% 100%;
  animation: flowCss 12s infinite linear;
} */

.blink {
  background-image:url(src/assets/header.png);
  width: 46%;
  height: 130px;
  margin:0 auto;
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
  /* 本例12个文字(加标点符号)；有多少个文字，width就是多少个em */
  width: 12em;
  /* 加上两个动画，一个是打字动画，使用steps让字一个一个的出现，
             注意step和字数保持一致，光标动画也是同理，*/
  animation: typingWords 3s steps(12), cursor 0.5s steps(1) infinite;
  /* 要设置不允许换行，且溢出隐藏 */
  white-space: nowrap;
  overflow: hidden;
  /* 使用右边框作为打印的指针光标 */
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

.el-checkbox-group,.el-form {
  font-weight:bolder;
}

.common-layout::before {
  width: 100%;
  height: 100%; 
  background-image: url(src/assets/bg.png);
  background-size: cover;
  position: absolute; /*图片定位*/
  top: 0;
  left: 0;
  content: "";
  z-index: -1; /*设置该标签等级，让其始终位于最底层*/
  opacity: 38%; /*设置透明度   blur还可以改变照片的模糊度*/
  filter: opacity(38%);
}
</style>
