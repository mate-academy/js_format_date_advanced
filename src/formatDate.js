'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [,,, separatorFrom] = fromFormat;
  const [,,, separatorTo] = toFormat;
  const dateCurrArray = date.split(separatorFrom);
  const arrayResult = [];
  const objFrom = {};
  let resultData = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY') {
      fromFormat[i] = 'YYYY';
      dateCurrArray[i] = dateCurrArray[i] < 30
        ? '20' + dateCurrArray[i]
        : '19' + dateCurrArray[i];
    }

    objFrom[fromFormat[i]] = dateCurrArray[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] !== 'YY') {
      arrayResult[i] = objFrom[toFormat[i]];
    } else {
      arrayResult[i] = objFrom['YYYY'].slice(-2);
    }
  }

  resultData = arrayResult.join(separatorTo);

  return resultData;
}

module.exports = formatDate;
