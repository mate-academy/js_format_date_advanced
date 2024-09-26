'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let resultDate = '';
  const resultDateArr = [];
  const dateSelector = fromFormat[3];
  const toDateSelector = toFormat[3];
  const dateArr = date.split(dateSelector);
  let day = '';
  let month = '';
  let yearTwoSigns = '';
  let yearFourSigns = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      day = dateArr[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateArr[i];
    }

    if (fromFormat[i] === 'YY') {
      yearTwoSigns = dateArr[i];

      if (Number(yearTwoSigns) < 30) {
        yearFourSigns = '20' + yearTwoSigns;
      }

      if (Number(yearTwoSigns) >= 30) {
        yearFourSigns = '19' + yearTwoSigns;
      }
    }

    if (fromFormat[i] === 'YYYY') {
      yearFourSigns = dateArr[i];
      yearTwoSigns = yearFourSigns.split('').slice(2).join('');
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      resultDateArr[i] = day;
    }

    if (toFormat[i] === 'MM') {
      resultDateArr[i] = month;
    }

    if (toFormat[i] === 'YY') {
      resultDateArr[i] = yearTwoSigns;
    }

    if (toFormat[i] === 'YYYY') {
      resultDateArr[i] = yearFourSigns;
    }
  }

  resultDate = resultDateArr.join(toDateSelector);

  return resultDate;
}

module.exports = formatDate;
