'use strict';

function formatDate(date, fromFormat, toFormat) {
  const arrDate = date.split(fromFormat[3]);

  const newData = {};
  const newDateArr = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i][0] === 'Y') {
      newData.Y = arrDate[i];
    } else if (fromFormat[i][0] === 'M') {
      newData.M = arrDate[i];
    } else {
      newData.D = arrDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i][0] === 'Y') {
      if (toFormat[i].length === 2) {
        newDateArr.push(newData.Y.slice(2));
      } else {
        newDateArr.push(newData.Y);
      }
    } else if (toFormat[i][0] === 'M') {
      newDateArr.push(newData.M);
    } else {
      newDateArr.push(newData.D);
    }
  }

  return newDateArr.join(toFormat[3]);
}
module.exports = formatDate;
