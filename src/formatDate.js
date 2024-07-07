'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat.pop();
  const separatorTo = toFormat.pop();
  const dateArr = date.split(separatorFrom);
  const resultArr = [];

  for (let i = 0; i < toFormat.length; i++) {
    const format = toFormat[i];
    const index = fromFormat.indexOf(format);

    if (index === -1) {
      if (format === 'YYYY') {
        const fromIndex = fromFormat.indexOf('YY');
        const year = dateArr[fromIndex];

        resultArr.push(+year < 30 ? '20' + year : '19' + year);
      } else if (format === 'YY') {
        const fromIndex = fromFormat.indexOf('YYYY');
        const year = dateArr[fromIndex];

        resultArr.push(year.slice(-2));
      }
    } else {
      resultArr.push(dateArr[index]);
    }
  }

  const newFormatDate = resultArr.join(separatorTo);

  return newFormatDate;
}

module.exports = formatDate;
