<template>
    <div class="main">
      <!-- 总计时器 -->
      <stop-watch class="watch1" ref="allwatch" @over="over"></stop-watch>
      <!-- 分段计时器 -->
      <stop-watch class="watch2" ref="partwatch" v-show="showPartWatch"></stop-watch>
      <!-- 计次列表 -->
      <div class="lists-box" >
        <div class="lists-head" v-show="showPartWatch">
          <span>次数</span>
          <span>分段</span>
          <span>累计</span>
        </div>
        <ul class="lists" v-show="showPartWatch">
          <li v-for="(list,index) in lists" :key="index">
            <span>{{index+1}}</span>
            <span>{{list.partTime}}</span>
            <span>{{list.allTime}}</span>
          </li>
        </ul>
      </div>
      <div class="btns">
        <div class="btn btn1" @click="whenClickStart">{{startText}}</div>
        <div class="btn btn2" @click="whenChickReset" v-show="startText !== '开始'">{{!isStart?'复位':'计次'}}</div>
      </div>
    </div>
</template>

<script>
import StopWatch from './components/StopWatch'
export default {
  data () {
    return {
        isStart: false , //是否点击开始
        startText: '开始', //开始按钮文字
        showPartWatch: false, //是否显示分段秒表
        allTime: 0 , //总时间
        partTime: 0 , //分段时间
        lists:[], //计次列表
    }
  },
  methods:{
    whenClickStart() {
      if(!this.isStart){
        this.startText='暂停'
        this.$refs.allwatch.start()
        if(this.showPartWatch) {
          this.$refs.partwatch.start()
        }
      } else {
        this.startText='继续'
        this.$refs.allwatch.pused()
        if(this.showPartWatch) {
          this.$refs.partwatch.pused()
        }
      }
      this.isStart = !this.isStart
    },
    whenChickReset(){
      let allwatch = this.$refs.allwatch
      let partwatch = this.$refs.partwatch
      if(!this.isStart) {
        allwatch.reset()
        partwatch.reset()
        this.lists=[]
        this.showPartWatch = false
        this.startText='开始'
      } else {
        this.allTime = allwatch.minute + ':' + allwatch.second + ':' + allwatch.millisecond  //拿到第一个子组件的时间，即总时间
        if(!this.showPartWatch) {
          this.partTime = this.allTime //第一次计次时，分段时间等于总时间
          this.showPartWatch=true //点击计次,显示分段计时器
        } else {
          this.partTime = partwatch.minute + ':' + partwatch.second + ':' + partwatch.millisecond //拿到第二个自组件的时间，即分段时间
        }
        this.$set(this.lists,this.lists.length,{allTime:this.allTime,partTime:this.partTime})
        partwatch.reset() //先重置
        partwatch.start() //再计时
      }
    },
    over(e) {
      if(e.minute == 59) {
        this.startText='开始'
        this.isStart = this.showPartWatch = false
        alert('已经到达计时极限，请重新计时～')
      }
    }
  },
  components: {
    StopWatch
  },
}
</script>

<style scoped lang="stylus">
  *
    margin 0
    padding 0
  .main
    display flex
    justify-content flex-start
    align-items center
    flex-direction column
    width 100vw
    height 100vh
    margin-top 100px
    .watch1
      font-size 30px
    .watch2
      font-size 24px
    .lists-box
      width 50vw
      height 40vh
      margin-top 50px
      .lists-head
        display flex
        justify-content space-around
        align-items center
        span 
            width 15vw
      .lists
        height 30vh
        overflow auto
        &::-webkit-scrollbar
            width 0
        li
          display flex
          justify-content space-around
          align-items center
          border-bottom 1px solid #999
          list-style none
          &::last-child
            border none
          span 
            width 15vw
    .btns
      width 50vw
      display flex
      justify-content center
      align-items center
      .btn
        display flex
        justify-content center
        align-items center
        width 70px
        height 40px
        font-size 18px
        color #fff
        border-radius 10px
        border none
        margin 10px  
        &.btn1
          background #f7052e
        &.btn2
          background #cac0c2
</style>