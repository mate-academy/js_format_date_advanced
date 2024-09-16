'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);

  const fromFormatWithValues = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    fromFormatWithValues[fromFormat[i]] = dateArr[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    const valueArr = fromFormatWithValues.YYYY.split('');

    delete fromFormatWithValues.YYYY;

    valueArr.shift();
    valueArr.shift();

    fromFormatWithValues.YY = valueArr.join('');
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (+fromFormatWithValues.YY < 30) {
      fromFormatWithValues.YYYY = 20 + fromFormatWithValues.YY;
    } else {
      fromFormatWithValues.YYYY = 19 + fromFormatWithValues.YY;
    }

    delete fromFormatWithValues.YY;
  }

  const newFormatOfDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    newFormatOfDate.push(fromFormatWithValues[toFormat[i]]);
  }

  return newFormatOfDate.join(toFormat[3]);
}

module.exports = formatDate;
