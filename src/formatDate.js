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
  const fromDelimeter = fromFormat[fromFormat.length - 1];
  const dateArr = date.split(fromDelimeter);
  const dataObj = {};

  for (let d = 0; d <= fromFormat.length - 2; d++) {
    dataObj[fromFormat[d]] = dateArr[d];
  }

  const properObj = {};
  const propFormat = toFormat.slice(0, -1);

  for (const d of propFormat) {
    if (d === 'YY') {
      properObj[d] = dataObj[d] || ('' + dataObj['YYYY']).slice(2);
    } else if (d === 'YYYY') {
      properObj[d] = dataObj[d] || changeYear(dataObj['YY']);
    } else {
      properObj[d] = dataObj[d];
    }
  }

  function changeYear(firstFormat) {
    switch (true) {
      case firstFormat < 30:
        return '20' + firstFormat;
      case firstFormat >= 30:
        return '19' + firstFormat;
    }
  }

  const resultArr = [];

  for (const value of Object.values(properObj)) {
    resultArr.push(value);
  }

  const result = resultArr.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
