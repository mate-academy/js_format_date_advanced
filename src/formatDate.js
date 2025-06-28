'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const splitDate = date.split(fromFormat[3]);

  let fromYear = 0;
  let fromYearLength = 0;
  let fromMonth = 0;
  let fromDay = 0;

  const newDate = new Array(3);

  let toYear = 0;
  let toYearLength = 0;
  let toMonth = 0;
  let toDay = 0;
  const toDelimiter = toFormat[3];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('Y')) {
      fromYear = i;
      fromYearLength = fromFormat[i].length;
    } else if (fromFormat[i].includes('M')) {
      fromMonth = i;
    } else {
      fromDay = i;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('Y')) {
      toYear = i;
      toYearLength = toFormat[i].length;
    } else if (toFormat[i].includes('M')) {
      toMonth = i;
    } else {
      toDay = i;
    }
  }

  const day = splitDate[fromDay];
  const month = splitDate[fromMonth];
  let year = splitDate[fromYear];

  if (fromYearLength === 4 && toYearLength === 2) {
    year = year.slice(2);
  } else if (fromYearLength === 2 && toYearLength === 4) {
    if (+splitDate[fromYear] < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  newDate[toDay] = day;
  newDate[toMonth] = month;
  newDate[toYear] = year;

  const result = newDate.join(toDelimiter);

  return result;
}

module.exports = formatDate;
