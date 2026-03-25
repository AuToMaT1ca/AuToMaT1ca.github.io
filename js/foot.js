// 修复核心问题：1. 先定义函数再调用 2. 避免嵌套<script>标签 3. 修复DOM操作方式
$(document).ready(function() {
  // 页脚养鱼功能（修复动态插入script的错误写法）
  function initFish() {
    // 设置footer-wrap样式
    $("#footer-wrap").css({
      position: "absolute",
      "text-align": "center",
      top: -55,
      right: 0,
      left: 0,
      bottom: 0
    });
    // 添加养鱼容器
    $("footer").append('<div class="container" id="jsi-flying-fish-container"></div>');
    // 正确加载外部js（避免直接append<script>导致Hexo解析异常）
    var fishScript = document.createElement('script');
    fishScript.src = "https://fastly.jsdelivr.net/gh/xiabo2/CDN@latest/fish.js";
    fishScript.async = true;
    fishScript.defer = true;
    document.body.appendChild(fishScript);
  }

  // 动态心跳文案
  function initHeartbeat() {
    $('.copyright').html('©2021-2024 <i class="fa-fw fas fa-heartbeat card-announcement-animation cc_pointer"></i> By Willow-God');
  }

  // 本站运行时间
  function show_date_time() {
    $('.framework-info').html('小破站已经苟且偷生<span id="span_dt_dt" style="color: #fff;"></span>');
    const BirthDay = new Date("2021/12/12 01:27:36"); // 统一日期格式，避免解析错误
    const today = new Date();
    const timeold = today.getTime() - BirthDay.getTime();
    const secondsold = Math.floor(timeold / 1000);
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysold = Math.floor(timeold / msPerDay);
    const e_hrsold = (timeold / msPerDay - daysold) * 24;
    const hrsold = Math.floor(e_hrsold);
    const e_minsold = (e_hrsold - hrsold) * 60;
    const minsold = Math.floor(e_minsold);
    const seconds = Math.floor((e_minsold - minsold) * 60);
    // 修复：用jQuery操作DOM，避免直接调用span_dt_dt（Hexo渲染时可能未定义）
    $('#span_dt_dt').html(
      '<font style=color:#afb4db>'+daysold+'</font> 天 '+
      '<font style=color:#f391a9>'+hrsold+'</font> 时 '+
      '<font style=color:#fdb933>'+minsold+'</font> 分 '+
      '<font style=color:#a3cf62>'+seconds+'</font> 秒'
    );
  }

  // 执行所有初始化函数
  initFish();
  initHeartbeat();
  show_date_time();
  setInterval(show_date_time, 1000); // 替换setTimeout递归，避免内存泄漏
});