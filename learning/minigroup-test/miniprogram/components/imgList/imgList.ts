Component({

  behaviors: [],

  properties: {
    src: { // 属性名
      type: String,
      value: ''
    },
    idx: Number, // 简化的定义方式,
    title:String,
    tempthumb:String,
    loaded:Boolean,
    mode:{
      type:String,
      value:'widthFix'
    },
    hei: { // 属性名
      type: String,
      value: '100rpx'
    },
  },
  
  data: {}, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  methods: {
    imgOnLoad: function(e:any){
      // console.log("e",e)
      let myEventDetail:object = {
        idx:e.target.dataset.idx,
        img:e.target.dataset.img,
      } // detail对象，提供给事件监听函数
      this.triggerEvent('myevent',myEventDetail)
    },
  }

})