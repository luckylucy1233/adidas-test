// miniprogram/pages/product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curPage: 1,
    totalPage: 0,
    pageSize: 10,
    productList: [],
    isAll: false,
    imgs: [],
    imgHeights: [],
    imgsLoaded: false,
    leftImgs: [],
    rightImgs: [],
    count:0,
    halfscreenWidth:0,//当前设备屏幕宽度的一半
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const _this:any = this
    //拿到当前设备屏幕宽度
    wx.getSystemInfo({
      success (res) {
        _this.setData({
          halfscreenWidth:res.screenWidth / 2
        })
        _this.loadData(_this.data.curPage)
      }
    })
  },

  async loadData(page: number) {
    let _this: any = this
    wx.showLoading({
      title: '加载中',
    })
    await wx.request({
      url: 'https://www.fastmock.site/mock/7af99cd5bc12ab71e50de687a81f15c7/api/productList', //仅为mock示例，并非真实的接口地址
      data: { curPage: page, pageSize: _this.data.pageSize },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res: any) {
        if (res.data) {
          let imgArr:any = []
          res.data.rows.forEach((element: any) => {
            element.loaded = false
            element.tempthumb = '../../img/emptyPic.png'
            imgArr.push(element.img)
          });
          if (page === 1) {
            _this.setData({ "curPage": page, "productList": res.data.rows,"imgs":imgArr, "totalPage": res.data.total })
          } else if (page !== 1 && Number(res.data.total) > _this.data.curPage * _this.data.pageSize) {
            _this.setData({ "curPage": _this.data.curPage++, "productList": _this.data.productList.concat(res.data.rows),"imgs":_this.data.imgs.concat(imgArr), "totalPage": res.data.total })
          }
          if (Number(res.data.total) <= _this.data.curPage * _this.data.pageSize) {
            _this.setData({ isAll: true })
          } else {
            _this.setData({ isAll: false })
          }
        }
      }
    })
  },

  loadAllImgHeights(productList:any){
    const _this:any = this
    const heights:any = []
    let loadImgHei = (img:string)=>{
      return new Promise((reslove)=>{
        wx.getImageInfo({
          src: img,
          success (res) {
            const ratio = res.height / res.width
            // 高度按屏幕一半的比例来计算
            const halfHeight = ratio * _this.data.halfscreenWidth
            reslove(halfHeight)
          }
        })
      })
    }

    let loadImgHeiArr:any= []
    productList.forEach((element:any) => {
      loadImgHeiArr.push(loadImgHei(element["img"]))
    });

    Promise.all(loadImgHeiArr).then((res:any)=>{
      res.map((item:number)=>{
        heights.push(item)
      })
      _this.setData({
        imgHeights:heights
      })

      const { left, right } = _this.greedyAlgorithm(heights)

      let setImgArr = (arr:any)=>{
        let value :any= []
        arr.map((item:number)=>{
          value.push({
            img:_this.data.imgs[item],
            height:`${_this.data.imgHeights[item]*2}rpx`,
            loaded:_this.data.productList[item].loaded,
            tempthumb:_this.data.productList[item].tempthumb,
            title:_this.data.productList[item].title,
          })
        })
        return value
      }
      _this.setData({
        leftImgs:setImgArr(left),
        rightImgs:setImgArr(right),
        imgsLoaded:true
      })
      _this.data.imgsLoaded = true
      wx.hideLoading()
    })
  },


  // 利用贪心算法 在每装一个图片前都对比一下左右数组的高度和，往高度较小的那个数组里去放入下一项。
  greedyAlgorithm:(heights:any) => {
    let leftHeight = 0
    let rightHeight = 0
    let left:any = []
    let right:any = []

    heights.forEach((height:any, index:number) => {
      if (leftHeight >= rightHeight) {
        right.push(index)
        rightHeight += height
      } else {
        left.push(index)
        leftHeight += height
      }
    })
    return { left, right }
  },

  handerImgLoaded(e:any){
    let that:any = this
    let idx:number = e.target.dataset.idx;
    let loadedImg:string= e.target.dataset.img;
    if(that.data.productList[idx]['img'] === loadedImg){
      let productListIndex:string = `productList[${idx}].loaded`
      //解决短时间频繁进行setData操作 数据无法更新问题
      setTimeout(()=>{
        that.setData({
          [productListIndex]:true,
          count:that.data.count + 1
        })
        //判断所有图片资源是否加载完毕
        if(that.data.count === that.data.productList.length){
          console.log("图片加载完毕",that.data.count === that.data.productList.length)
          that.loadAllImgHeights(that.data.productList)
        }
      },1000*Math.random())
    }
  },

  handerImgError(e:any){
    let that:any = this
    let idx:number = e.target.dataset.idx;
    console.log("图片加载失败")
    setTimeout(()=>{
      let productListIndex:string = `productList[${idx}].loaded`
      that.setData({
        [productListIndex]:false
      })
      wx.hideLoading()
    },1000*Math.random())
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
    let page: number = this.data.curPage + 1
    if (this.data.productList.length < this.data.totalPage) {
      this.loadData(page)
    } else {
      this.setData({ isAll: true })
    }
  },
})


