'use strict';

function formatDate(date, fromFormat, toFormat) {
  // write code here
  const partsDate = date.split(`${fromFormat[3]}`);
  const dateObj = {};
  let result = [];

  for (let i = 0; i < partsDate.length; i++) {
    dateObj[fromFormat[i]] = partsDate[i];
  }

  if (dateObj.hasOwnProperty('YYYY')) {
    dateObj.YY = dateObj.YYYY.slice(2);
  }

  if (dateObj.YY < 30) {
    dateObj.YYYY = '20' + dateObj.YY;
  } else {
    dateObj.YYYY = '19' + dateObj.YY;
  }


  for (let i = 0; i < toFormat.length - 1; i++) {
    for (const part in dateObj) {
      if (toFormat[i] === part) {
        result.push(dateObj[part]);
      }
    }
  }

  return result.join(`${toFormat[3]}`);

}

module.exports = formatDate;
