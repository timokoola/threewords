const months_ = [...Array(12).keys()];
const days = [...Array(30).keys()];

const wdayOptions = { weekday: "long"};
const monthOptions = {month: "long"};

for (let d of days) {
  const d_ = new Date(`2021-01-${d}`);
  const day_ = new Date(`2021-01-${d}`).toLocaleDateString("ru-ru", wdayOptions);
  console.log(`${d_.getDay()}: ${day_}`);
}

for (let m of months_) {
  const day_ = new Date(`2021-${m+1}-01`).toLocaleDateString("ru-ru", monthOptions);
  const day_en = new Date(`2021-${m+1}-01`).toLocaleDateString("en-en", monthOptions);
  console.log(day_);
  
}