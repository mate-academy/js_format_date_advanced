'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObject = {};
  const sortDate = [];
  const [, , , separatorFrom] = fromFormat;
  const [, , , separatorTo] = toFormat;
  const separateDate = date.split(separatorFrom);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY') {
      if (separateDate[i] < 30) {
        dateObject[fromFormat[i] + 'YY'] = '20' + separateDate[i];
      } else {
        dateObject[fromFormat[i] + 'YY'] = '19' + separateDate[i];
      }
    } else if (fromFormat[i] === 'YYYY' && toFormat.includes('YY')) {
      dateObject['YY'] = separateDate[i].slice(2);
    } else {
      dateObject[fromFormat[i]] = separateDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    sortDate.push(dateObject[toFormat[i]]);
  }

  return sortDate.join(separatorTo);
}

module.exports = formatDate;
