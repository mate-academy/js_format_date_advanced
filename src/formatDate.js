'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitDate = date.split(fromFormat[3]);

  let years =
    splitDate[fromFormat.findIndex((el) => el === 'YYYY' || el === 'YY')];
  const months = splitDate[fromFormat.findIndex((el) => el === 'MM')];
  const days = splitDate[fromFormat.findIndex((el) => el === 'DD')];

  const isFromYYYY = fromFormat.includes('YYYY');
  const isToYYYY = toFormat.includes('YYYY');

  if (isFromYYYY && !isToYYYY) {
    years = years.slice(-2);
  }

  if (!isFromYYYY && isToYYYY) {
    years = years < 30 ? '20' + years : '19' + years;
  }

  const result = [];

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      result.push(years);
    }

    if (toFormat[i] === 'MM') {
      result.push(months);
    }

    if (toFormat[i] === 'DD') {
      result.push(days);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
