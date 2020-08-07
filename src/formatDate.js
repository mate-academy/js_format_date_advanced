'use strict';

function formatDate(date, fromFormat, toFormat) {
  const arrFromDate = date.split(fromFormat[3]);
  const newData = {};
  const newDateArr = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i][0]) {
      case 'Y': newData.Y = arrFromDate[i];
        break;
      case 'M': newData.M = arrFromDate[i];
        break;
      case 'D': newData.D = arrFromDate[i];
        break;
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
