<script setup lang="ts">
import { ref } from 'vue'
import CountUp from 'vue-countup-v3'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

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
    <el-container>
      <el-header class="blink" style="height:100px;font-size: 50px;text-align: center;">随机金额吃随机食物</el-header>
      <el-main>
        <div>
          <el-row>
            <el-text class="amtrange" style="font-size: 30px;color:cornflowerblue;">请选择金额范围: 0元-{{ sliderValue
            }}元</el-text>
          </el-row>
          <el-row style="margin-top: 10px;">
            <div class="slider-demo-block">
              <el-slider v-model="sliderValue" show-input style="width: 600px;" max="100" />
            </div>
          </el-row>
        </div>
        <div>
          <el-dialog v-model="amtdialogVisible" title="今天能吃的随机金额是人均:" width="50%">
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
            <div style="margin-top: 10px;">
              <el-button type="primary" round @click="getAmt(sliderValue)" size="large">开始</el-button>
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
          <el-row style="margin-top: 10px;">
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
                  <el-button @click="addFood" :icon="Plus" style="margin-left: 10px;"></el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-row>
          <el-row>
            <div>
              <el-button type="primary" round @click="getfood" size="large">开始</el-button>
            </div>
          </el-row>
          <el-row>
            <div>
              <el-result icon="success" :title="randomFood" :sub-title="'人均' + randomAmt + '元'">
              </el-result>
            </div>
          </el-row>
        </div>
        <div>
          <el-dialog v-model="fooddialogVisible" title="今天吃的随机食物是:" width="60%" style="text-align: center;">
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
@keyframes blink {
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
}

@keyframes foodres {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.blink {
  background: linear-gradient(135deg,
      #a3d0bd,
      #cb9db9 25%,
      #6fb0c1 50%,
      #a9a681 55%,
      #2cc4e0 60%,
      #ae89cf 80%,
      #c28794 95%,
      #7eb8ad);
  /* 文字颜色填充设置为透明 */
  /* 背景裁剪，即让文字使用背景色 */
  background-clip: text;
  /* 背景图放大一下，看着柔和一些 */
  background-size: 200% 100%;
  /* 应用动画flowCss 12秒速度 无限循环 线性匀速动画*/
  animation: flowCss 12s infinite linear;
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
</style>
