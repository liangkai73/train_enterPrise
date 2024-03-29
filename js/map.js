var content = [
    "<div><b>特力林科技大厦</b></div><div><span>仓山区梅花楼路与妙高路交叉口</span></div>",
];
//创建 infoWindow 实例
var infoWindow = new AMap.InfoWindow({
    content: content.join("<br>"), //传入字符串拼接的 DOM 元素
    anchor: "bottom-center",
});
var map = new AMap.Map("map-container", {
    zoom: 14,
    center: [119.241217, 26.052997],
    resizeEnable: true
});
infoWindow.open(map, map.getCenter());