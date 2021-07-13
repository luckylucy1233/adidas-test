"use strict";
Component({
    behaviors: [],
    properties: {
        src: {
            type: String,
            value: ''
        },
        idx: Number,
        title: String,
        tempthumb: String,
        loaded: Boolean,
        mode: {
            type: String,
            value: 'widthFix'
        },
        hei: {
            type: String,
            value: '100rpx'
        },
    },
    data: {},
    lifetimes: {
        attached: function () { },
        moved: function () { },
        detached: function () { },
    },
    attached: function () { },
    ready: function () { },
    pageLifetimes: {
        show: function () { },
        hide: function () { },
        resize: function () { },
    },
    methods: {
        imgOnLoad: function (e) {
            var myEventDetail = {
                idx: e.target.dataset.idx,
                img: e.target.dataset.img,
            };
            this.triggerEvent('myevent', myEventDetail);
        },
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ0xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVMsQ0FBQztJQUVSLFNBQVMsRUFBRSxFQUFFO0lBRWIsVUFBVSxFQUFFO1FBQ1YsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0QsR0FBRyxFQUFFLE1BQU07UUFDWCxLQUFLLEVBQUMsTUFBTTtRQUNaLFNBQVMsRUFBQyxNQUFNO1FBQ2hCLE1BQU0sRUFBQyxPQUFPO1FBQ2QsSUFBSSxFQUFDO1lBQ0gsSUFBSSxFQUFDLE1BQU07WUFDWCxLQUFLLEVBQUMsVUFBVTtTQUNqQjtRQUNELEdBQUcsRUFBRTtZQUNILElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLFFBQVE7U0FDaEI7S0FDRjtJQUVELElBQUksRUFBRSxFQUFFO0lBRVIsU0FBUyxFQUFFO1FBRVQsUUFBUSxFQUFFLGNBQWMsQ0FBQztRQUN6QixLQUFLLEVBQUUsY0FBYyxDQUFDO1FBQ3RCLFFBQVEsRUFBRSxjQUFjLENBQUM7S0FDMUI7SUFHRCxRQUFRLEVBQUUsY0FBYyxDQUFDO0lBQ3pCLEtBQUssRUFBRSxjQUFhLENBQUM7SUFFckIsYUFBYSxFQUFFO1FBRWIsSUFBSSxFQUFFLGNBQWMsQ0FBQztRQUNyQixJQUFJLEVBQUUsY0FBYyxDQUFDO1FBQ3JCLE1BQU0sRUFBRSxjQUFjLENBQUM7S0FDeEI7SUFFRCxPQUFPLEVBQUU7UUFDUCxTQUFTLEVBQUUsVUFBUyxDQUFLO1lBRXZCLElBQUksYUFBYSxHQUFVO2dCQUN6QixHQUFHLEVBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRztnQkFDeEIsR0FBRyxFQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUc7YUFDekIsQ0FBQTtZQUNELElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQzVDLENBQUM7S0FDRjtDQUVGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIkNvbXBvbmVudCh7XHJcblxyXG4gIGJlaGF2aW9yczogW10sXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIHNyYzogeyAvLyDlsZ7mgKflkI1cclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICB2YWx1ZTogJydcclxuICAgIH0sXHJcbiAgICBpZHg6IE51bWJlciwgLy8g566A5YyW55qE5a6a5LmJ5pa55byPLFxyXG4gICAgdGl0bGU6U3RyaW5nLFxyXG4gICAgdGVtcHRodW1iOlN0cmluZyxcclxuICAgIGxvYWRlZDpCb29sZWFuLFxyXG4gICAgbW9kZTp7XHJcbiAgICAgIHR5cGU6U3RyaW5nLFxyXG4gICAgICB2YWx1ZTond2lkdGhGaXgnXHJcbiAgICB9LFxyXG4gICAgaGVpOiB7IC8vIOWxnuaAp+WQjVxyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIHZhbHVlOiAnMTAwcnB4J1xyXG4gICAgfSxcclxuICB9LFxyXG4gIFxyXG4gIGRhdGE6IHt9LCAvLyDnp4HmnInmlbDmja7vvIzlj6/nlKjkuo7mqKHmnb/muLLmn5NcclxuXHJcbiAgbGlmZXRpbWVzOiB7XHJcbiAgICAvLyDnlJ/lkb3lkajmnJ/lh73mlbDvvIzlj6/ku6XkuLrlh73mlbDvvIzmiJbkuIDkuKrlnKhtZXRob2Rz5q615Lit5a6a5LmJ55qE5pa55rOV5ZCNXHJcbiAgICBhdHRhY2hlZDogZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgbW92ZWQ6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgIGRldGFjaGVkOiBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgfSxcclxuXHJcbiAgLy8g55Sf5ZG95ZGo5pyf5Ye95pWw77yM5Y+v5Lul5Li65Ye95pWw77yM5oiW5LiA5Liq5ZyobWV0aG9kc+auteS4reWumuS5ieeahOaWueazleWQjVxyXG4gIGF0dGFjaGVkOiBmdW5jdGlvbiAoKSB7IH0sIC8vIOatpOWkhGF0dGFjaGVk55qE5aOw5piO5Lya6KKrbGlmZXRpbWVz5a2X5q615Lit55qE5aOw5piO6KaG55uWXHJcbiAgcmVhZHk6IGZ1bmN0aW9uKCkgeyB9LFxyXG5cclxuICBwYWdlTGlmZXRpbWVzOiB7XHJcbiAgICAvLyDnu4Tku7bmiYDlnKjpobXpnaLnmoTnlJ/lkb3lkajmnJ/lh73mlbBcclxuICAgIHNob3c6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgIGhpZGU6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgIHJlc2l6ZTogZnVuY3Rpb24gKCkgeyB9LFxyXG4gIH0sXHJcblxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGltZ09uTG9hZDogZnVuY3Rpb24oZTphbnkpe1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhcImVcIixlKVxyXG4gICAgICBsZXQgbXlFdmVudERldGFpbDpvYmplY3QgPSB7XHJcbiAgICAgICAgaWR4OmUudGFyZ2V0LmRhdGFzZXQuaWR4LFxyXG4gICAgICAgIGltZzplLnRhcmdldC5kYXRhc2V0LmltZyxcclxuICAgICAgfSAvLyBkZXRhaWzlr7nosaHvvIzmj5Dkvpvnu5nkuovku7bnm5HlkKzlh73mlbBcclxuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ215ZXZlbnQnLG15RXZlbnREZXRhaWwpXHJcbiAgICB9LFxyXG4gIH1cclxuXHJcbn0pIl19