'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromFormatArr = date.split(`${fromFormat[3]}`);
  const finalArrToStr = [];
  const separator = toFormat.pop();

  for (let i = 0; i < toFormat.length; i++) {
    const toFormatElement = toFormat[i];
    const fromIndex = fromFormat.indexOf(toFormatElement);

    if (fromIndex !== -1) {
      finalArrToStr.push(fromFormatArr[fromIndex]);
    } else if (toFormatElement === 'YYYY' && finalArrToStr.length !== 3) {
      const yearIndex = fromFormat.indexOf('YY');
      const yearValue = +fromFormatArr[yearIndex];
      finalArrToStr.push(yearValue < 30 ? `20${yearValue}` : `19${yearValue}`);
    } else if (toFormatElement === 'YY' && finalArrToStr.length !== 3) {
      const yearIndex = fromFormat.indexOf('YYYY');
      finalArrToStr.push(`${fromFormatArr[yearIndex].slice(2)}`);
    }
  }

  return finalArrToStr.join(`${separator}`);
}

module.exports = formatDate;
