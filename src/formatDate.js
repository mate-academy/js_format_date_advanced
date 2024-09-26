'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dataObj = {};
  const dataFromArr = date.split(fromFormat[3]);
  const dataToArr = [];
  const separator = toFormat[3];

  const fromYYtoYYYY = (obj) => {
    if (obj['YY'] < 30) {
      obj['YYYY'] = '20' + obj['YY'];
    } else {
      obj['YYYY'] = '19' + obj['YY'];
    }
  };

  for (let i = 0; i < dataFromArr.length; i++) {
    dataObj[fromFormat[i]] = dataFromArr[i];
  }

  if (toFormat.includes('YY')) {
    dataObj['YY'] = `${dataObj['YYYY']}`.slice(-2);
  }

  if (toFormat.includes('YYYY') && !dataObj['YYYY']) {
    fromYYtoYYYY(dataObj);
  }

  for (const item of toFormat.slice(0, -1)) {
    dataToArr.push(dataObj[item]);
  }

  return dataToArr.join(separator);
}

module.exports = formatDate;
