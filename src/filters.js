import './filters.js'
import Vue from 'vue'
import moment from 'moment'

Vue.filter("progressBar", (val) => {
  const doneItemsCount = val.reduce((acc, item) => {
    return (item.isDone) ? ++acc : acc
  }, 0);
  return (doneItemsCount) ? Math.round((doneItemsCount / val.length) * 100) + '%' : '0%'
});

Vue.filter("formatNum", (val) => {
  return Number(val).toLocaleString();
});

Vue.filter("formatTime", (val) => {
  return moment(val).fromNow();
});

Vue.filter("capitalize", (val) => {
  if (!val) return "";
  val = val.toString();
  return val.charAt(0).toUpperCase() + val.slice(1);
});

Vue.filter('toUSD', function (value) {
  return `$${value}`;
});

Vue.filter('pluck', function (objects, key) {
  return objects.map(function (object) {
    return object[key];
  });
});

Vue.filter('isMember', (memberToCheck, members) => {
  let temp = members.filter(member => member._id === memberToCheck._id)
  return (temp.length > 0) ? '✔️' : ''
})

