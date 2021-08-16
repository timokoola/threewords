const months_ = [...Array(12).keys()];
const days = [...Array(30).keys()];

const wdayOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
const monthOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

for (let d of days) {
  const day_ = new Date(`2021-01-${d}`).toLocaleDateString("ru-ru", wdayOptions);
  console.log(day_);
}
