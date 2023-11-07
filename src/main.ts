import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import {
    LotteryGrid,
    LotteryList,
    SlotMachine
  } from 'lattice-lottery-plus'
  import 'lattice-lottery-plus/lib/lattice-lottery.css'

createApp(App).use(ElementPlus).use(LotteryGrid).use(LotteryList).use(SlotMachine).mount('#app')
