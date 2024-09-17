'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arr = [];
  const separator = fromFormat.pop();
  const dataArr = date.split(separator);
  const toSeparator = toFormat.pop();

  const indexNew = checkDatePlace(toFormat);
  const indexOld = checkDatePlace(fromFormat);
  const newYear = toFormat[indexNew.year];
  const oldYear = fromFormat[indexOld.year];

  arr[indexNew.day] = dataArr[indexOld.day];
  arr[indexNew.month] = dataArr[indexOld.month];

  if (newYear === oldYear) {
    arr[indexNew.year] = dataArr[indexOld.year];
  } else if (newYear.length < oldYear.length) {
    arr[indexNew.year] = dataArr[indexOld.year].slice(2);
  } else {
    if (dataArr[indexOld.year] < 30) {
      arr[indexNew.year] = 20 + dataArr[indexOld.year];
    } else {
      arr[indexNew.year] = 19 + dataArr[indexOld.year];
    }
  }

  return arr.join(toSeparator);
}

function checkDatePlace(formDate) {
  let year = 0;
  let month = 0;
  let day = 0;

  for (let i = 0; i < formDate.length; i++) {
    if (formDate[i].includes('Y')) {
      year = i;
    }

    if (formDate[i].includes('M')) {
      month = i;
    }

    if (formDate[i].includes('D')) {
      day = i;
    }
  }

  return {
    'day': day,
    'month': month,
    'year': year,
  };
}
module.exports = formatDate;
