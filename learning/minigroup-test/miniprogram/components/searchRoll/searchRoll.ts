/*
 * @Description: 
 * @Version: 1.0
 * @Autor: luxi.yang
 * @Date: 2021-07-12 10:20:29
 * @LastEditors: luxi.yang
 * @LastEditTime: 2021-07-13 10:27:53
 */
Component({

  behaviors: [],

  properties: {
    list: { // 属性名
      type: Array,
      value: []
    }
  },

  data: {
    navHeight: getApp().globalData.navHeight,
    navTop: getApp().globalData.navTop,
    navWidth: getApp().globalData.navWidth
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {

    },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
    },
    hide: function () { },
    resize: function () { },
  },

  methods: {
    handler(e: any) {
      this.triggerEvent("event", e.currentTarget.dataset.text)
    }
  }
})