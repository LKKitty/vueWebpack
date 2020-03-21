<template>
    <div class="content">
        <span>{{minute}} :</span>
        <span>{{second}} .</span>
        <span>{{millisecond}}</span>
    </div>
</template>

<script>
export default {
  data() {
    return{
        timer: null, //时间器
        minute: '00', //分钟
        second: '00',//秒钟
        millisecond: '00',//毫秒
        currentTime: 0, //当前的时间
        per_time: 0 , //记录上一次的时间
        intervals: 0 ,//初始化时间差 默认为0
        per_intervals: 0, //记录暂停计时的时间
    }
  },
  mounted(){
  },
  methods:{
    start(){
      let date = new Date()
      this.currentTime = date.getTime() //记录当前的时间
      this.per_time = this.currentTime //保存当前的时间
      this.startText='暂停'
      this.timer = setInterval(()=>{
        this.timeIncrement()
      },10)
    },
    pused(){
      let date = new Date()
      this.per_intervals += date.getTime() - this.per_time //记录暂停时的时间差
      clearInterval(this.timer) //清除定时器
    },
    reset(){
      clearInterval(this.timer)
      this.millisecond=this.second=this.minute='00'
      this.currentTime=this.per_time=this.intervals = this.per_intervals = 0
    },
    timeIncrement(){
      let date = new Date() //重新计时
      this.intervals = date.getTime() - this.currentTime + this.per_intervals//时间差 = 当前的时间 - 开始的时间
      let ms = this.intervals%1000/10; //能被1000整除的都是秒的倍数 1秒等于1000毫秒 再吧1000毫秒分成100份，就是
      let s = this.intervals%60000/1000; //能被60000整除的都是分的倍数
      let min = this.intervals%3600000/60000;
      this.minute = min < 10 ? '0' + Math.floor(min) : Math.floor(min)
      this.second = s < 10 ? '0' + Math.floor(s) : Math.floor(s)
      this.millisecond = ms < 10 ? '0' + Math.floor(ms) : Math.floor(ms)
      // 如果时间等于59分钟即一小时
      if(this.minute == 59) {
        this.$emit('over',{minute:this.minute}) //告诉父组件结束计时
        this.reset()
      }
    }
  }
}
</script>

<style scoped lang="stylus">
    .content
      display flex
      justify-content center
      align-items center
      span 
        width 60px
</style>