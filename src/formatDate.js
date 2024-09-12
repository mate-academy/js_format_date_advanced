'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const BORDER_OF_THE_AGES = 30;
  const LAST_CENTURY = 19;
  const PRESENT_CENTURY = 20;
  const fromFormatObj = {};
  const separateValue = date.split(fromFormat[3]);
  const resultFormatDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    fromFormatObj[fromFormat[i]] = separateValue[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (fromFormatObj.hasOwnProperty('YYYY')) {
      fromFormatObj.YY = fromFormatObj.YYYY.slice(2);
    }

    if (fromFormatObj.YY < BORDER_OF_THE_AGES) {
      fromFormatObj['YYYY'] = PRESENT_CENTURY + fromFormatObj.YY;
    } else {
      fromFormatObj.YYYY = LAST_CENTURY + fromFormatObj.YY;
    }

    resultFormatDate.push(fromFormatObj[toFormat[i]]);
  }

  return resultFormatDate.join(toFormat[3]);
}

module.exports = formatDate;
