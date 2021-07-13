// miniprogram/pages/product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curPage: 1,
    totalPage: 0,
    pageSize:10,
    productList: [],
    isAll:false,
    skeyList:[
      {'txt':'帽子'},
      {'txt':'围巾'},
      {'txt':'鞋子'},
      {'txt':'大衣'},
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.loadData(this.data.curPage)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  async loadData(page: number) {
    let _this:any = this
    wx.showLoading({
      title: '加载中',
    })
    await wx.request({
      url: 'https://www.fastmock.site/mock/7af99cd5bc12ab71e50de687a81f15c7/api/productList', //仅为示例，并非真实的接口地址
      data: { curPage: page,pageSize:_this.data.pageSize },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res:any) {
        wx.hideLoading()
        if (res.data) {
          res.data.rows.forEach((element: any) => {
            element.loaded = false
            element.tempthumb = '../../img/emptyPic.png'
          });
          if (page === 1 ) {
            _this.setData({ curPage: page,productList: res.data.rows,totalPage: res.data.total})
          }else if(page !== 1 && Number(res.data.total) > _this.data.curPage * _this.data.pageSize) {
            let newArr:any = _this.data.productList.concat(res.data.rows)
            _this.setData({ curPage: _this.data.curPage++, "productList": newArr,totalPage: res.data.total})
          }
          if(Number(res.data.total) <= _this.data.curPage * _this.data.pageSize){
            _this.setData({ isAll: true})
          }else{
            _this.setData({ isAll: false})
          }
        }
      }
    })
  },

  handerImgLoaded(myEventDetail:any){
    let that:any = this
    let idx:number = myEventDetail.detail.idx;
    let loadedImg:string= myEventDetail.detail.img;
    if(that.data.productList[idx]['img'] === loadedImg){
      let productListIndex:string = `productList[${idx}].loaded`
      //解决短时间频繁进行setData操作 数据无法更新问题
      setTimeout(()=>{
        that.setData({
          [productListIndex]:true,
        })
      },1000*Math.random())
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadData(this.data.curPage)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let page:number = this.data.curPage + 1
    if(this.data.productList.length < this.data.totalPage){
      this.loadData(page)
    }else{
      this.setData({ isAll: true})
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  searchJump(myEventDetail:any){
    console.log("myEventDetail",myEventDetail)
    let skey:string=myEventDetail.detail;
    wx.navigateTo({
      url: `/pages/search/search?skey=${skey}`
    })
  }
})