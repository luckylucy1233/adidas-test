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
        imgs: [],
        imgHeights: [],
        imgsLoaded: false,
        leftImgs: [],
        rightImgs: [],
        count: 0,
        halfscreenWidth: 0,
    },
    onLoad: function () {
        var _this = this;
        wx.getSystemInfo({
            success: function (res) {
                _this.setData({
                    halfscreenWidth: res.screenWidth / 2
                });
                _this.loadData(_this.data.curPage);
            }
        });
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
                                    if (res.data) {
                                        var imgArr_1 = [];
                                        res.data.rows.forEach(function (element) {
                                            element.loaded = false;
                                            element.tempthumb = '../../img/emptyPic.png';
                                            imgArr_1.push(element.img);
                                        });
                                        if (page === 1) {
                                            _this.setData({ "curPage": page, "productList": res.data.rows, "imgs": imgArr_1, "totalPage": res.data.total });
                                        }
                                        else if (page !== 1 && Number(res.data.total) > _this.data.curPage * _this.data.pageSize) {
                                            _this.setData({ "curPage": _this.data.curPage++, "productList": _this.data.productList.concat(res.data.rows), "imgs": _this.data.imgs.concat(imgArr_1), "totalPage": res.data.total });
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
    loadAllImgHeights: function (productList) {
        var _this = this;
        var heights = [];
        var loadImgHei = function (img) {
            return new Promise(function (reslove) {
                wx.getImageInfo({
                    src: img,
                    success: function (res) {
                        var ratio = res.height / res.width;
                        var halfHeight = ratio * _this.data.halfscreenWidth;
                        reslove(halfHeight);
                    }
                });
            });
        };
        var loadImgHeiArr = [];
        productList.forEach(function (element) {
            loadImgHeiArr.push(loadImgHei(element["img"]));
        });
        Promise.all(loadImgHeiArr).then(function (res) {
            res.map(function (item) {
                heights.push(item);
            });
            _this.setData({
                imgHeights: heights
            });
            var _a = _this.greedyAlgorithm(heights), left = _a.left, right = _a.right;
            var setImgArr = function (arr) {
                var value = [];
                arr.map(function (item) {
                    value.push({
                        img: _this.data.imgs[item],
                        height: _this.data.imgHeights[item] * 2 + "rpx",
                        loaded: _this.data.productList[item].loaded,
                        tempthumb: _this.data.productList[item].tempthumb,
                        title: _this.data.productList[item].title,
                    });
                });
                return value;
            };
            _this.setData({
                leftImgs: setImgArr(left),
                rightImgs: setImgArr(right),
                imgsLoaded: true
            });
            _this.data.imgsLoaded = true;
            wx.hideLoading();
        });
    },
    greedyAlgorithm: function (heights) {
        var leftHeight = 0;
        var rightHeight = 0;
        var left = [];
        var right = [];
        heights.forEach(function (height, index) {
            if (leftHeight >= rightHeight) {
                right.push(index);
                rightHeight += height;
            }
            else {
                left.push(index);
                leftHeight += height;
            }
        });
        return { left: left, right: right };
    },
    handerImgLoaded: function (e) {
        var that = this;
        var idx = e.target.dataset.idx;
        var loadedImg = e.target.dataset.img;
        if (that.data.productList[idx]['img'] === loadedImg) {
            var productListIndex_1 = "productList[" + idx + "].loaded";
            setTimeout(function () {
                var _a;
                that.setData((_a = {},
                    _a[productListIndex_1] = true,
                    _a.count = that.data.count + 1,
                    _a));
                if (that.data.count === that.data.productList.length) {
                    console.log("图片加载完毕", that.data.count === that.data.productList.length);
                    that.loadAllImgHeights(that.data.productList);
                }
            }, 1000 * Math.random());
        }
    },
    handerImgError: function (e) {
        var that = this;
        var idx = e.target.dataset.idx;
        console.log("图片加载失败");
        setTimeout(function () {
            var _a;
            var productListIndex = "productList[" + idx + "].loaded";
            that.setData((_a = {},
                _a[productListIndex] = false,
                _a));
            wx.hideLoading();
        }, 1000 * Math.random());
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaXNjb3Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLENBQUM7UUFDVixTQUFTLEVBQUUsQ0FBQztRQUNaLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEVBQUU7UUFDZixLQUFLLEVBQUUsS0FBSztRQUNaLElBQUksRUFBRSxFQUFFO1FBQ1IsVUFBVSxFQUFFLEVBQUU7UUFDZCxVQUFVLEVBQUUsS0FBSztRQUNqQixRQUFRLEVBQUUsRUFBRTtRQUNaLFNBQVMsRUFBRSxFQUFFO1FBQ2IsS0FBSyxFQUFDLENBQUM7UUFDUCxlQUFlLEVBQUMsQ0FBQztLQUNsQjtJQUtELE1BQU0sRUFBRTtRQUNOLElBQU0sS0FBSyxHQUFPLElBQUksQ0FBQTtRQUV0QixFQUFFLENBQUMsYUFBYSxDQUFDO1lBQ2YsT0FBTyxZQUFFLEdBQUc7Z0JBQ1YsS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFDWixlQUFlLEVBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDO2lCQUNwQyxDQUFDLENBQUE7Z0JBQ0YsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3BDLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUssUUFBUSxFQUFkLFVBQWUsSUFBWTs7Ozs7O3dCQUNyQixLQUFLLEdBQVEsSUFBSSxDQUFBO3dCQUNyQixFQUFFLENBQUMsV0FBVyxDQUFDOzRCQUNiLEtBQUssRUFBRSxLQUFLO3lCQUNiLENBQUMsQ0FBQTt3QkFDRixXQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0NBQ2YsR0FBRyxFQUFFLGlGQUFpRjtnQ0FDdEYsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFB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O29CQUN4QixDQUFBO1lBQ0YsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2xCLENBQUMsRUFBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUtELGlCQUFpQixFQUFFO1FBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNoQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBS0QsYUFBYSxFQUFFO1FBQ2IsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFBO1FBQ3hDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDcEI7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtTQUM5QjtJQUNILENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy9wcm9kdWN0LmpzXHJcblBhZ2Uoe1xyXG5cclxuICAvKipcclxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cclxuICAgKi9cclxuICBkYXRhOiB7XHJcbiAgICBjdXJQYWdlOiAxLFxyXG4gICAgdG90YWxQYWdlOiAwLFxyXG4gICAgcGFnZVNpemU6IDEwLFxyXG4gICAgcHJvZHVjdExpc3Q6IFtdLFxyXG4gICAgaXNBbGw6IGZhbHNlLFxyXG4gICAgaW1nczogW10sXHJcbiAgICBpbWdIZWlnaHRzOiBbXSxcclxuICAgIGltZ3NMb2FkZWQ6IGZhbHNlLFxyXG4gICAgbGVmdEltZ3M6IFtdLFxyXG4gICAgcmlnaHRJbWdzOiBbXSxcclxuICAgIGNvdW50OjAsXHJcbiAgICBoYWxmc2NyZWVuV2lkdGg6MCwvL+W9k+WJjeiuvuWkh+Wxj+W5leWuveW6pueahOS4gOWNilxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XHJcbiAgICovXHJcbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBfdGhpczphbnkgPSB0aGlzXHJcbiAgICAvL+aLv+WIsOW9k+WJjeiuvuWkh+Wxj+W5leWuveW6plxyXG4gICAgd3guZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgIF90aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgaGFsZnNjcmVlbldpZHRoOnJlcy5zY3JlZW5XaWR0aCAvIDJcclxuICAgICAgICB9KVxyXG4gICAgICAgIF90aGlzLmxvYWREYXRhKF90aGlzLmRhdGEuY3VyUGFnZSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBhc3luYyBsb2FkRGF0YShwYWdlOiBudW1iZXIpIHtcclxuICAgIGxldCBfdGhpczogYW55ID0gdGhpc1xyXG4gICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICB9KVxyXG4gICAgYXdhaXQgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJ2h0dHBzOi8vd3d3LmZhc3Rtb2NrLnNpdGUvbW9jay83YWY5OWNkNWJjMTJhYjcxZTUwZGU2ODdhODFmMTVjNy9hcGkvcHJvZHVjdExpc3QnLCAvL+S7heS4um1vY2vnpLrkvovvvIzlubbpnZ7nnJ/lrp7nmoTmjqXlj6PlnLDlnYBcclxuICAgICAgZGF0YTogeyBjdXJQYWdlOiBwYWdlLCBwYWdlU2l6ZTogX3RoaXMuZGF0YS5wYWdlU2l6ZSB9LFxyXG4gICAgICBoZWFkZXI6IHtcclxuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIC8vIOm7mOiupOWAvFxyXG4gICAgICB9LFxyXG4gICAgICBzdWNjZXNzKHJlczogYW55KSB7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICBsZXQgaW1nQXJyOmFueSA9IFtdXHJcbiAgICAgICAgICByZXMuZGF0YS5yb3dzLmZvckVhY2goKGVsZW1lbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LmxvYWRlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIGVsZW1lbnQudGVtcHRodW1iID0gJy4uLy4uL2ltZy9lbXB0eVBpYy5wbmcnXHJcbiAgICAgICAgICAgIGltZ0Fyci5wdXNoKGVsZW1lbnQuaW1nKVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpZiAocGFnZSA9PT0gMSkge1xyXG4gICAgICAgICAgICBfdGhpcy5zZXREYXRhKHsgXCJjdXJQYWdlXCI6IHBhZ2UsIFwicHJvZHVjdExpc3RcIjogcmVzLmRhdGEucm93cyxcImltZ3NcIjppbWdBcnIsIFwidG90YWxQYWdlXCI6IHJlcy5kYXRhLnRvdGFsIH0pXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgIT09IDEgJiYgTnVtYmVyKHJlcy5kYXRhLnRvdGFsKSA+IF90aGlzLmRhdGEuY3VyUGFnZSAqIF90aGlzLmRhdGEucGFnZVNpemUpIHtcclxuICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7IFwiY3VyUGFnZVwiOiBfdGhpcy5kYXRhLmN1clBhZ2UrKywgXCJwcm9kdWN0TGlzdFwiOiBfdGhpcy5kYXRhLnByb2R1Y3RMaXN0LmNvbmNhdChyZXMuZGF0YS5yb3dzKSxcImltZ3NcIjpfdGhpcy5kYXRhLmltZ3MuY29uY2F0KGltZ0FyciksIFwidG90YWxQYWdlXCI6IHJlcy5kYXRhLnRvdGFsIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoTnVtYmVyKHJlcy5kYXRhLnRvdGFsKSA8PSBfdGhpcy5kYXRhLmN1clBhZ2UgKiBfdGhpcy5kYXRhLnBhZ2VTaXplKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnNldERhdGEoeyBpc0FsbDogdHJ1ZSB9KVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7IGlzQWxsOiBmYWxzZSB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBsb2FkQWxsSW1nSGVpZ2h0cyhwcm9kdWN0TGlzdDphbnkpe1xyXG4gICAgY29uc3QgX3RoaXM6YW55ID0gdGhpc1xyXG4gICAgY29uc3QgaGVpZ2h0czphbnkgPSBbXVxyXG4gICAgbGV0IGxvYWRJbWdIZWkgPSAoaW1nOnN0cmluZyk9PntcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNsb3ZlKT0+e1xyXG4gICAgICAgIHd4LmdldEltYWdlSW5mbyh7XHJcbiAgICAgICAgICBzcmM6IGltZyxcclxuICAgICAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgICAgICBjb25zdCByYXRpbyA9IHJlcy5oZWlnaHQgLyByZXMud2lkdGhcclxuICAgICAgICAgICAgLy8g6auY5bqm5oyJ5bGP5bmV5LiA5Y2K55qE5q+U5L6L5p2l6K6h566XXHJcbiAgICAgICAgICAgIGNvbnN0IGhhbGZIZWlnaHQgPSByYXRpbyAqIF90aGlzLmRhdGEuaGFsZnNjcmVlbldpZHRoXHJcbiAgICAgICAgICAgIHJlc2xvdmUoaGFsZkhlaWdodClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBsb2FkSW1nSGVpQXJyOmFueT0gW11cclxuICAgIHByb2R1Y3RMaXN0LmZvckVhY2goKGVsZW1lbnQ6YW55KSA9PiB7XHJcbiAgICAgIGxvYWRJbWdIZWlBcnIucHVzaChsb2FkSW1nSGVpKGVsZW1lbnRbXCJpbWdcIl0pKVxyXG4gICAgfSk7XHJcblxyXG4gICAgUHJvbWlzZS5hbGwobG9hZEltZ0hlaUFycikudGhlbigocmVzOmFueSk9PntcclxuICAgICAgcmVzLm1hcCgoaXRlbTpudW1iZXIpPT57XHJcbiAgICAgICAgaGVpZ2h0cy5wdXNoKGl0ZW0pXHJcbiAgICAgIH0pXHJcbiAgICAgIF90aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGltZ0hlaWdodHM6aGVpZ2h0c1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgY29uc3QgeyBsZWZ0LCByaWdodCB9ID0gX3RoaXMuZ3JlZWR5QWxnb3JpdGhtKGhlaWdodHMpXHJcblxyXG4gICAgICBsZXQgc2V0SW1nQXJyID0gKGFycjphbnkpPT57XHJcbiAgICAgICAgbGV0IHZhbHVlIDphbnk9IFtdXHJcbiAgICAgICAgYXJyLm1hcCgoaXRlbTpudW1iZXIpPT57XHJcbiAgICAgICAgICB2YWx1ZS5wdXNoKHtcclxuICAgICAgICAgICAgaW1nOl90aGlzLmRhdGEuaW1nc1tpdGVtXSxcclxuICAgICAgICAgICAgaGVpZ2h0OmAke190aGlzLmRhdGEuaW1nSGVpZ2h0c1tpdGVtXSoyfXJweGAsXHJcbiAgICAgICAgICAgIGxvYWRlZDpfdGhpcy5kYXRhLnByb2R1Y3RMaXN0W2l0ZW1dLmxvYWRlZCxcclxuICAgICAgICAgICAgdGVtcHRodW1iOl90aGlzLmRhdGEucHJvZHVjdExpc3RbaXRlbV0udGVtcHRodW1iLFxyXG4gICAgICAgICAgICB0aXRsZTpfdGhpcy5kYXRhLnByb2R1Y3RMaXN0W2l0ZW1dLnRpdGxlLFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICB9XHJcbiAgICAgIF90aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGxlZnRJbWdzOnNldEltZ0FycihsZWZ0KSxcclxuICAgICAgICByaWdodEltZ3M6c2V0SW1nQXJyKHJpZ2h0KSxcclxuICAgICAgICBpbWdzTG9hZGVkOnRydWVcclxuICAgICAgfSlcclxuICAgICAgX3RoaXMuZGF0YS5pbWdzTG9hZGVkID0gdHJ1ZVxyXG4gICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG5cclxuICAvLyDliKnnlKjotKrlv4Pnrpfms5Ug5Zyo5q+P6KOF5LiA5Liq5Zu+54mH5YmN6YO95a+55q+U5LiA5LiL5bem5Y+z5pWw57uE55qE6auY5bqm5ZKM77yM5b6A6auY5bqm6L6D5bCP55qE6YKj5Liq5pWw57uE6YeM5Y675pS+5YWl5LiL5LiA6aG544CCXHJcbiAgZ3JlZWR5QWxnb3JpdGhtOihoZWlnaHRzOmFueSkgPT4ge1xyXG4gICAgbGV0IGxlZnRIZWlnaHQgPSAwXHJcbiAgICBsZXQgcmlnaHRIZWlnaHQgPSAwXHJcbiAgICBsZXQgbGVmdDphbnkgPSBbXVxyXG4gICAgbGV0IHJpZ2h0OmFueSA9IFtdXHJcblxyXG4gICAgaGVpZ2h0cy5mb3JFYWNoKChoZWlnaHQ6YW55LCBpbmRleDpudW1iZXIpID0+IHtcclxuICAgICAgaWYgKGxlZnRIZWlnaHQgPj0gcmlnaHRIZWlnaHQpIHtcclxuICAgICAgICByaWdodC5wdXNoKGluZGV4KVxyXG4gICAgICAgIHJpZ2h0SGVpZ2h0ICs9IGhlaWdodFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxlZnQucHVzaChpbmRleClcclxuICAgICAgICBsZWZ0SGVpZ2h0ICs9IGhlaWdodFxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHsgbGVmdCwgcmlnaHQgfVxyXG4gIH0sXHJcblxyXG4gIGhhbmRlckltZ0xvYWRlZChlOmFueSl7XHJcbiAgICBsZXQgdGhhdDphbnkgPSB0aGlzXHJcbiAgICBsZXQgaWR4Om51bWJlciA9IGUudGFyZ2V0LmRhdGFzZXQuaWR4O1xyXG4gICAgbGV0IGxvYWRlZEltZzpzdHJpbmc9IGUudGFyZ2V0LmRhdGFzZXQuaW1nO1xyXG4gICAgaWYodGhhdC5kYXRhLnByb2R1Y3RMaXN0W2lkeF1bJ2ltZyddID09PSBsb2FkZWRJbWcpe1xyXG4gICAgICBsZXQgcHJvZHVjdExpc3RJbmRleDpzdHJpbmcgPSBgcHJvZHVjdExpc3RbJHtpZHh9XS5sb2FkZWRgXHJcbiAgICAgIC8v6Kej5Yaz55+t5pe26Ze06aKR57mB6L+b6KGMc2V0RGF0YeaTjeS9nCDmlbDmja7ml6Dms5Xmm7TmlrDpl67pophcclxuICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgIHRoYXQuc2V0RGF0YSh7XHJcbiAgICAgICAgICBbcHJvZHVjdExpc3RJbmRleF06dHJ1ZSxcclxuICAgICAgICAgIGNvdW50OnRoYXQuZGF0YS5jb3VudCArIDFcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8v5Yik5pat5omA5pyJ5Zu+54mH6LWE5rqQ5piv5ZCm5Yqg6L295a6M5q+VXHJcbiAgICAgICAgaWYodGhhdC5kYXRhLmNvdW50ID09PSB0aGF0LmRhdGEucHJvZHVjdExpc3QubGVuZ3RoKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Zu+54mH5Yqg6L295a6M5q+VXCIsdGhhdC5kYXRhLmNvdW50ID09PSB0aGF0LmRhdGEucHJvZHVjdExpc3QubGVuZ3RoKVxyXG4gICAgICAgICAgdGhhdC5sb2FkQWxsSW1nSGVpZ2h0cyh0aGF0LmRhdGEucHJvZHVjdExpc3QpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LDEwMDAqTWF0aC5yYW5kb20oKSlcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBoYW5kZXJJbWdFcnJvcihlOmFueSl7XHJcbiAgICBsZXQgdGhhdDphbnkgPSB0aGlzXHJcbiAgICBsZXQgaWR4Om51bWJlciA9IGUudGFyZ2V0LmRhdGFzZXQuaWR4O1xyXG4gICAgY29uc29sZS5sb2coXCLlm77niYfliqDovb3lpLHotKVcIilcclxuICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgbGV0IHByb2R1Y3RMaXN0SW5kZXg6c3RyaW5nID0gYHByb2R1Y3RMaXN0WyR7aWR4fV0ubG9hZGVkYFxyXG4gICAgICB0aGF0LnNldERhdGEoe1xyXG4gICAgICAgIFtwcm9kdWN0TGlzdEluZGV4XTpmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICB9LDEwMDAqTWF0aC5yYW5kb20oKSlcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxyXG4gICAqL1xyXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmxvYWREYXRhKHRoaXMuZGF0YS5jdXJQYWdlKVxyXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXHJcbiAgICovXHJcbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHBhZ2U6IG51bWJlciA9IHRoaXMuZGF0YS5jdXJQYWdlICsgMVxyXG4gICAgaWYgKHRoaXMuZGF0YS5wcm9kdWN0TGlzdC5sZW5ndGggPCB0aGlzLmRhdGEudG90YWxQYWdlKSB7XHJcbiAgICAgIHRoaXMubG9hZERhdGEocGFnZSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7IGlzQWxsOiB0cnVlIH0pXHJcbiAgICB9XHJcbiAgfSxcclxufSlcclxuXHJcblxyXG4iXX0=