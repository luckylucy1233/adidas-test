/*
 * @Description: 
 * @Version: 1.0
 * @Autor: luxi.yang
 * @Date: 2021-07-13 10:55:37
 * @LastEditors: luxi.yang
 * @LastEditTime: 2021-07-13 10:55:37
 */
// miniprogram/pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skeyList: [
      { 'txt': '帽子' },
      { 'txt': '围巾' },
      { 'txt': '鞋子' },
      { 'txt': '大衣' },
    ],
    category: [],
    navHeight: getApp().globalData.navHeight,
    navTop: getApp().globalData.navTop,
    windowHeight: getApp().globalData.windowHeight,
    activeIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("options",options)
    this.loadCatory()
  },

  loadCatory() {
    const _this: any = this
    wx.request({
      url: "https://www.fastmock.site/mock/7af99cd5bc12ab71e50de687a81f15c7/api/getCatogery",
      data: "",
      success(res: any) {
        console.log("res", res)
        _this.setData({
          category: res.data.content
        })
        _this.loadCatoryCtx(res.data.content[0].contentId)
      }
    })
  },

  loadCatoryCtx(id: string) {
    wx.request({
      url: `https://ecp-sit-public.s3.cn-north-1.amazonaws.com.cn/ecp-cms/cdn-file/page_conf/WMS/zh_CN/online/0/${id}.json`,
      data: "",
      success(res: any) {
        console.log("res", res)
      }
    })
  },

  changeType(e: any) {
    console.log("id", e.currentTarget.dataset.id)
    console.log("index", e.currentTarget.dataset.index)
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    })
    this.loadCatoryCtx(e.currentTarget.dataset.id)
  },

  searchJump(myEventDetail: any) {
    console.log("myEventDetail", myEventDetail)
    let skey: string = myEventDetail.detail;
    wx.navigateTo({
      url: `/pages/search/search?skey=${skey}`
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

})