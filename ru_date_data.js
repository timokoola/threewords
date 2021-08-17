const fs = require("fs");

const months_ = [...Array(12).keys()];
const days = [...Array(30).keys()];

const wdayOptions = { weekday: "long" };
const monthOptions = { month: "long" };

let russianWeekdays = [];
let seenDays = new Set([]);

for (let d of days) {
  const d_ = new Date(`2021-01-${d + 4}`);
  const day_ = new Date(`2021-01-${d + 4}`).toLocaleDateString("ru-ru", wdayOptions);
  if (seenDays.has(day_)) {
    console.log(`Saw this day already ${day_}`);
    break;
  } else {
    seenDays.add(day_);
    const day_en = new Date(`2021-01-${d + 4}`).toLocaleDateString("en-en", wdayOptions);
    const day_zh = new Date(`2021-01-${d + 4}`).toLocaleDateString("zh-ch", wdayOptions);
    const item = { ru: day_, en: day_en, zh: day_zh };
    russianWeekdays.push(item);
  }
}

let russianMonths = [];

for (let m of months_) {
  const day_ = new Date(`2021-${m + 1}-01`).toLocaleDateString("ru-ru", monthOptions);
  const day_en = new Date(`2021-${m + 1}-01`).toLocaleDateString("en-en", monthOptions);
  const day_zh = new Date(`2021-${m + 1}-01`).toLocaleDateString("zh-ch", monthOptions);
  const item = { ru: day_, en: day_en, zh: day_zh };
  russianMonths.push(item);
}

let ruDataJSON = JSON.stringify({ months: russianMonths, weekdays: russianWeekdays }, 2);

fs.writeFile("src/_data/rudata.json", ruDataJSON, (err) => {
  console.log(err);
});
