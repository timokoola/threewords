---
title: "Today's date & info"
description: "Quick Summary of Today"
---

Today (今天， сегодня) is <p id="zh-date">2021 年 8 月 31 日</p><p id="zh-weekday">星期二</p> or <p id="ru-date">вторник, 31 августа 2021 г.</p>

<script>
(function () {
  var today = new Date();
  var zhDate = document.getElementById("zh-date");
  var zhWeekday = document.getElementById("zh-weekday");
  var ruDate = document.getElementById("ru-date");

  var zhWeekdays = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
  var zhDateStr = `${today.getYear()+1900}年 ${today.getMonth()+1} 月 ${today.getDate()} 日`;
  zhDate.innerText = zhDateStr;
  zhWeekday.innerText = zhWeekdays[today.getDay()];

  var ruMonths = [{% for m in rudata.months %}
"{{m.ru}}",
{% endfor %}];
  var ruWeekdays = [{% for wd in rudata.weekdays %}
"{{wd.ru}}",
{% endfor %}];

    var ruTemplate = `${ruWeekdays[today.getDay()]}, ${today.getDate()} ${ruMonths[today.getMonth()]} ${today.getYear()+1900} г.`;

    ruDate.innerText = ruTemplate;


  

})();

</script>