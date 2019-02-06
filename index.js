'use strict';

const fs = require('fs');
const _ = require('lodash');
const moment = require('moment');

const dateFormat = "YYYY-MM-DD HH:mm:ss";
const periodStart = moment("2017-01-01 00:00:00");
const periodEnd = moment("2018-05-01 00:00:00");

let datePointer = periodStart.clone();
let timePeriods = [];
while(datePointer.isBefore(periodEnd)) {
  timePeriods.push(datePointer.format(dateFormat));
  datePointer.add(1, 'months');
}

timePeriods = _.map(
  timePeriods,
  (v, k) => {
    return {
      "label": moment(v).format("YYYY_MM"),
      "periodStart": v,
      "periodEnd": moment(v).endOf("month").format(dateFormat),
      "periodNextStart": moment(v).add(1, "month").format(dateFormat),
    }
  }
)

console.log(timePeriods);

const innerSql = `
  @periodNextStart`;

let sql = _.reduce(
  timePeriods,
  (aggr, val, key) => {
    return aggr += `
      ${_.replace(innerSql, /@periodNextStart/g, `'${val.periodNextStart}'`)}`;
  },
  ``
);

console.log(sql);


// let lyrics = 'But still I\'m having memories of high speeds when the cops crashed\n' +  
//              'As I laugh, pushin the gas while my Glocks blast\n' + 
//              'We was young and we was dumb but we had heart';

// // write to a new file named 2pac.txt
// fs.writeFile('2pac.txt', lyrics, (err) => {  
//     // throws an error, you could also catch it here
//     if (err) throw err;

//     // success case, the file was saved
//     console.log('Lyric saved!');
// });