// app.ts
App<IAppOption>({
  globalData: {
    // @ts-ignore
    navHeight: 0,
    navTop: 0,
    navWidth:0,
    windowHeight:0,
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();//获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点
    console.log("menuButtonObject",menuButtonObject)
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight:any = res.statusBarHeight,
          navTop:any = menuButtonObject.top,//胶囊按钮与顶部的距离
          navHeight:any = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;//导航高度
        // @ts-ignore
        this.globalData.navHeight = navHeight;// 1. 整个导航栏高 = statausBarHeight + height + (top-statausBarHeight )*2；
        // @ts-ignore
        this.globalData.navTop = navTop;//胶囊按钮与顶部的距离= top；
        // @ts-ignore
        this.globalData.navWidth = res.windowWidth - menuButtonObject.width - (res.windowWidth-menuButtonObject.right);//自定义navBar宽度 =屏幕宽度 - 胶囊宽度- 胶囊按钮与右侧的距离   胶囊按钮与右侧的距离 = windowWidth - right。
        // @ts-ignore
        this.globalData.windowHeight = res.windowHeight
        console.log("this.globalData",this.globalData)
      },
      fail(err) {
        console.log(err);
      }
    })
  },
})