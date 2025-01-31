'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separFrom = fromFormat.pop();
  const separTo = toFormat.pop();
  const dateArray = date.split(separFrom);
  const dateList = {};

  fromFormat.forEach((part, i) => {
    dateList[part] = dateArray[i];
  });

  if (toFormat.includes('YY') && dateList['YYYY']) {
    dateList['YY'] = dateList['YYYY'].slice(-2);
  } else if (toFormat.includes('YYYY') && dateList['YY']) {
    const year = dateList['YY'];

    dateList['YYYY'] = Number(year) < 30 ? '20' + year : '19' + year;
  }

  const result = toFormat.map((part) => dateList[part]).join(separTo);

  return result;
}

module.exports = formatDate;
