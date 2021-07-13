"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Page({
    data: {
        curPage: 1,
        totalPage: 0,
        pageSize: 10,
        productList: [],
        isAll: false,
        skeyList: [
            { 'txt': '帽子' },
            { 'txt': '围巾' },
            { 'txt': '鞋子' },
            { 'txt': '大衣' },
        ],
    },
    onLoad: function () {
        this.loadData(this.data.curPage);
    },
    onReady: function () {
    },
    onUnload: function () {
    },
    loadData: function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var _this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _this = this;
                        wx.showLoading({
                            title: '加载中',
                        });
                        return [4, wx.request({
                                url: 'https://www.fastmock.site/mock/7af99cd5bc12ab71e50de687a81f15c7/api/productList',
                                data: { curPage: page, pageSize: _this.data.pageSize },
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: function (res) {
                                    wx.hideLoading();
                                    if (res.data) {
                                        res.data.rows.forEach(function (element) {
                                            element.loaded = false;
                                            element.tempthumb = '../../img/emptyPic.png';
                                        });
                                        if (page === 1) {
                                            _this.setData({ curPage: page, productList: res.data.rows, totalPage: res.data.total });
                                        }
                                        else if (page !== 1 && Number(res.data.total) > _this.data.curPage * _this.data.pageSize) {
                                            var newArr = _this.data.productList.concat(res.data.rows);
                                            _this.setData({ curPage: _this.data.curPage++, "productList": newArr, totalPage: res.data.total });
                                        }
                                        if (Number(res.data.total) <= _this.data.curPage * _this.data.pageSize) {
                                            _this.setData({ isAll: true });
                                        }
                                        else {
                                            _this.setData({ isAll: false });
                                        }
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    },
    handerImgLoaded: function (myEventDetail) {
        var that = this;
        var idx = myEventDetail.detail.idx;
        var loadedImg = myEventDetail.detail.img;
        if (that.data.productList[idx]['img'] === loadedImg) {
            var productListIndex_1 = "productList[" + idx + "].loaded";
            setTimeout(function () {
                var _a;
                that.setData((_a = {},
                    _a[productListIndex_1] = true,
                    _a));
            }, 1000 * Math.random());
        }
    },
    onPullDownRefresh: function () {
        this.loadData(this.data.curPage);
        wx.stopPullDownRefresh();
    },
    onReachBottom: function () {
        var page = this.data.curPage + 1;
        if (this.data.productList.length < this.data.totalPage) {
            this.loadData(page);
        }
        else {
            this.setData({ isAll: true });
        }
    },
    onShareAppMessage: function () {
    },
    searchJump: function (myEventDetail) {
        console.log("myEventDetail", myEventDetail);
        var skey = myEventDetail.detail;
        wx.navigateTo({
            url: "/pages/search/search?skey=" + skey
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2R1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQUksQ0FBQztJQUtILElBQUksRUFBRTtRQUNKLE9BQU8sRUFBRSxDQUFDO1FBQ1YsU0FBUyxFQUFFLENBQUM7UUFDWixRQUFRLEVBQUMsRUFBRTtRQUNYLFdBQVcsRUFBRSxFQUFFO1FBQ2YsS0FBSyxFQUFDLEtBQUs7UUFDWCxRQUFRLEVBQUM7WUFDUCxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUM7WUFDWixFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUM7WUFDWixFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUM7WUFDWixFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUM7U0FDYjtLQUNGO0lBS0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFLRCxPQUFPLEVBQUU7SUFFVCxDQUFDO0lBS0QsUUFBUSxFQUFFO0lBRVYsQ0FBQztJQUVLLFFBQVEsRUFBZCxVQUFlLElBQVk7Ozs7Ozt3QkFDckIsS0FBSyxHQUFPLElBQUksQ0FBQTt3QkFDcEIsRUFBRSxDQUFDLFdBQVcsQ0FBQzs0QkFDYixLQUFLLEVBQUUsS0FBSzt5QkFDYixDQUFDLENBQUE7d0JBQ0YsV0FBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dDQUNmLEdBQUcsRUFBRSxpRkFBaUY7Z0NBQ3RGLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsUUFBUSxFQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dDQUNwRCxNQUFNLEVBQUU7b0NBQ04sY0FBYyxFQUFFLGtCQUFrQjtpQ0FDbkM7Z0NBQ0QsT0FBTyxFQUFQLFVBQVEsR0FBTztvQ0FDYixFQUFFLENBQUMsV0FBVyxFQUFF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LENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ3BCO2FBQUk7WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7U0FDN0I7SUFDSCxDQUFDO0lBS0QsaUJBQWlCLEVBQUU7SUFFbkIsQ0FBQztJQUNELFVBQVUsRUFBVixVQUFXLGFBQWlCO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQzFDLElBQUksSUFBSSxHQUFRLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDckMsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSwrQkFBNkIsSUFBTTtTQUN6QyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbWluaXByb2dyYW0vcGFnZXMvcHJvZHVjdC5qc1xyXG5QYWdlKHtcclxuXHJcbiAgLyoqXHJcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXHJcbiAgICovXHJcbiAgZGF0YToge1xyXG4gICAgY3VyUGFnZTogMSxcclxuICAgIHRvdGFsUGFnZTogMCxcclxuICAgIHBhZ2VTaXplOjEwLFxyXG4gICAgcHJvZHVjdExpc3Q6IFtdLFxyXG4gICAgaXNBbGw6ZmFsc2UsXHJcbiAgICBza2V5TGlzdDpbXHJcbiAgICAgIHsndHh0Jzon5bi95a2QJ30sXHJcbiAgICAgIHsndHh0Jzon5Zu05be+J30sXHJcbiAgICAgIHsndHh0Jzon6Z6L5a2QJ30sXHJcbiAgICAgIHsndHh0Jzon5aSn6KGjJ30sXHJcbiAgICBdLFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XHJcbiAgICovXHJcbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmxvYWREYXRhKHRoaXMuZGF0YS5jdXJQYWdlKVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXHJcbiAgICovXHJcbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xyXG5cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxyXG4gICAqL1xyXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIGxvYWREYXRhKHBhZ2U6IG51bWJlcikge1xyXG4gICAgbGV0IF90aGlzOmFueSA9IHRoaXNcclxuICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgfSlcclxuICAgIGF3YWl0IHd4LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICdodHRwczovL3d3dy5mYXN0bW9jay5zaXRlL21vY2svN2FmOTljZDViYzEyYWI3MWU1MGRlNjg3YTgxZjE1YzcvYXBpL3Byb2R1Y3RMaXN0JywgLy/ku4XkuLrnpLrkvovvvIzlubbpnZ7nnJ/lrp7nmoTmjqXlj6PlnLDlnYBcclxuICAgICAgZGF0YTogeyBjdXJQYWdlOiBwYWdlLHBhZ2VTaXplOl90aGlzLmRhdGEucGFnZVNpemUgfSxcclxuICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyAvLyDpu5jorqTlgLxcclxuICAgICAgfSxcclxuICAgICAgc3VjY2VzcyhyZXM6YW55KSB7XHJcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIGlmIChyZXMuZGF0YSkge1xyXG4gICAgICAgICAgcmVzLmRhdGEucm93cy5mb3JFYWNoKChlbGVtZW50OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5sb2FkZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICBlbGVtZW50LnRlbXB0aHVtYiA9ICcuLi8uLi9pbWcvZW1wdHlQaWMucG5nJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpZiAocGFnZSA9PT0gMSApIHtcclxuICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7IGN1clBhZ2U6IHBhZ2UscHJvZHVjdExpc3Q6IHJlcy5kYXRhLnJvd3MsdG90YWxQYWdlOiByZXMuZGF0YS50b3RhbH0pXHJcbiAgICAgICAgICB9ZWxzZSBpZihwYWdlICE9PSAxICYmIE51bWJlcihyZXMuZGF0YS50b3RhbCkgPiBfdGhpcy5kYXRhLmN1clBhZ2UgKiBfdGhpcy5kYXRhLnBhZ2VTaXplKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdBcnI6YW55ID0gX3RoaXMuZGF0YS5wcm9kdWN0TGlzdC5jb25jYXQocmVzLmRhdGEucm93cylcclxuICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7IGN1clBhZ2U6IF90aGlzLmRhdGEuY3VyUGFnZSsrLCBcInByb2R1Y3RMaXN0XCI6IG5ld0Fycix0b3RhbFBhZ2U6IHJlcy5kYXRhLnRvdGFsfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKE51bWJlcihyZXMuZGF0YS50b3RhbCkgPD0gX3RoaXMuZGF0YS5jdXJQYWdlICogX3RoaXMuZGF0YS5wYWdlU2l6ZSl7XHJcbiAgICAgICAgICAgIF90aGlzLnNldERhdGEoeyBpc0FsbDogdHJ1ZX0pXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7IGlzQWxsOiBmYWxzZX0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIGhhbmRlckltZ0xvYWRlZChteUV2ZW50RGV0YWlsOmFueSl7XHJcbiAgICBsZXQgdGhhdDphbnkgPSB0aGlzXHJcbiAgICBsZXQgaWR4Om51bWJlciA9IG15RXZlbnREZXRhaWwuZGV0YWlsLmlkeDtcclxuICAgIGxldCBsb2FkZWRJbWc6c3RyaW5nPSBteUV2ZW50RGV0YWlsLmRldGFpbC5pbWc7XHJcbiAgICBpZih0aGF0LmRhdGEucHJvZHVjdExpc3RbaWR4XVsnaW1nJ10gPT09IGxvYWRlZEltZyl7XHJcbiAgICAgIGxldCBwcm9kdWN0TGlzdEluZGV4OnN0cmluZyA9IGBwcm9kdWN0TGlzdFske2lkeH1dLmxvYWRlZGBcclxuICAgICAgLy/op6PlhrPnn63ml7bpl7TpopHnuYHov5vooYxzZXREYXRh5pON5L2cIOaVsOaNruaXoOazleabtOaWsOmXrumimFxyXG4gICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgdGhhdC5zZXREYXRhKHtcclxuICAgICAgICAgIFtwcm9kdWN0TGlzdEluZGV4XTp0cnVlLFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sMTAwMCpNYXRoLnJhbmRvbSgpKVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICovXHJcbiAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMubG9hZERhdGEodGhpcy5kYXRhLmN1clBhZ2UpXHJcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcclxuICAgKi9cclxuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgcGFnZTpudW1iZXIgPSB0aGlzLmRhdGEuY3VyUGFnZSArIDFcclxuICAgIGlmKHRoaXMuZGF0YS5wcm9kdWN0TGlzdC5sZW5ndGggPCB0aGlzLmRhdGEudG90YWxQYWdlKXtcclxuICAgICAgdGhpcy5sb2FkRGF0YShwYWdlKVxyXG4gICAgfWVsc2V7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7IGlzQWxsOiB0cnVlfSlcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcclxuICAgKi9cclxuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICB9LFxyXG4gIHNlYXJjaEp1bXAobXlFdmVudERldGFpbDphbnkpe1xyXG4gICAgY29uc29sZS5sb2coXCJteUV2ZW50RGV0YWlsXCIsbXlFdmVudERldGFpbClcclxuICAgIGxldCBza2V5OnN0cmluZz1teUV2ZW50RGV0YWlsLmRldGFpbDtcclxuICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICB1cmw6IGAvcGFnZXMvc2VhcmNoL3NlYXJjaD9za2V5PSR7c2tleX1gXHJcbiAgICB9KVxyXG4gIH1cclxufSkiXX0=