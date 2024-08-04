'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [, , , separator] = fromFormat;
  const partsCurrentDate = date.split(separator);
  const correctDateFormat = [...toFormat];
  const targetSeparator = correctDateFormat.pop();
  const dataObj = {};
  const transformedDateParts = [];

  for (let i = 0; i < 3; i++) {
    dataObj[fromFormat[i]] = partsCurrentDate[i];
  }

  if (dataObj['YYYY']) {
    dataObj['YY'] = dataObj['YYYY'].slice(2);
  }

  if (dataObj['YY'] < 30) {
    dataObj['YYYY'] = `20${dataObj['YY']}`;
  } else {
    dataObj['YYYY'] = `19${dataObj['YY']}`;
  }

  for (let i = 0; i < 3; i++) {
    transformedDateParts.push(dataObj[correctDateFormat[i]]);
  }

  return transformedDateParts.join(targetSeparator);
}

module.exports = formatDate;
