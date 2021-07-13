// index.ts
// 获取应用实例
Page({
  data: {
   skey:'',
   skeyHistory:[],
   navHeight:getApp().globalData.navHeight,
   navTop:getApp().globalData.navTop,
   navWidth:getApp().globalData.navWidth
  },
  onLoad(options:any) {
    let skeyList:any = []
    try {
      var value = wx.getStorageSync('skeyHistory')
      if (value) {
        skeyList = value
      }
    } catch (e) {
      console.log("skeyHistory error")
    }
    // @ts-ignore
    this.setData({
      skey:options.skey||'',
      skeyHistory:skeyList
    })
  },
  search(){
    const _this:any=this
    let skeyList:any = _this.data.skeyHistory
    let index:number = skeyList.indexOf(_this.data.skey)
    if( index === -1 ){
      skeyList.unshift(_this.data.skey)
    }else{
      skeyList.splice(index,1)
      skeyList.unshift(_this.data.skey)
    }
    _this.setData({
      skeyHistory:skeyList
    })
    wx.setStorageSync("skeyHistory",skeyList)
  },
  setValue(e:any){
    this.setData({
      skey:e.detail.value
    })
  },
  clear(){ 
    this.setData({
      skeyHistory:[]
    })
    wx.setStorageSync("skeyHistory",[])
  }
})
