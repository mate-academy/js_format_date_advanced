'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat.pop();
  const newSeparator = toFormat.pop();

  const oldDate = date.split(oldSeparator);
  const formattedDate = [];

  if (toFormat.includes('DD')) {
    formattedDate[toFormat.indexOf('DD')] = oldDate[fromFormat.indexOf('DD')];
  }

  if (toFormat.includes('MM')) {
    formattedDate[toFormat.indexOf('MM')] = oldDate[fromFormat.indexOf('MM')];
  }

  if (toFormat.indexOf('YY') !== -1) {
    if (fromFormat.indexOf('YYYY') !== -1) {
      formattedDate[toFormat.indexOf('YY')] =
        oldDate[fromFormat.indexOf('YYYY')].slice(2);
    } else {
      formattedDate[toFormat.indexOf('YY')] = oldDate[fromFormat.indexOf('YY')];
    }
  } else {
    if (oldDate[fromFormat.indexOf('YY')] >= 30) {
      formattedDate[toFormat.indexOf('YYYY')] =
        '19' + oldDate[fromFormat.indexOf('YY')];
    } else if (oldDate[fromFormat.indexOf('YY')] < 30) {
      formattedDate[toFormat.indexOf('YYYY')] =
        '20' + oldDate[fromFormat.indexOf('YY')];
    } else {
      formattedDate[toFormat.indexOf('YYYY')] =
        oldDate[fromFormat.indexOf('YYYY')];
    }
  }

  return formattedDate.join(newSeparator);
}

module.exports = formatDate;
