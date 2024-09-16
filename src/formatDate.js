'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const formatedDate = [];
  const fromDayPosition = fromFormat.indexOf('DD');
  const fromMonthPosition = fromFormat.indexOf('MM');
  const fromYearFormat = fromFormat.indexOf('YY') !== -1 ? 'YY' : 'YYYY';
  const fromYearPosition = fromFormat.indexOf(fromYearFormat);
  const toDayPosition = toFormat.indexOf('DD');
  const toMonthPosition = toFormat.indexOf('MM');
  const toYearFormat = toFormat.indexOf('YY') !== -1 ? 'YY' : 'YYYY';
  const toYearPosition = toFormat.indexOf(toYearFormat);
  const dateArray = date.split(fromFormat[3]);
  let formatedYear = dateArray[fromYearPosition];

  if (fromYearFormat === 'YYYY' && toYearFormat === 'YY') {
    formatedYear = dateArray[fromYearPosition].slice(2);
  }

  if (fromYearFormat === 'YY' && toYearFormat === 'YYYY') {
    formatedYear = dateArray[fromYearPosition] < 30
      ? `20${formatedYear}` : `19${formatedYear}`;
  }

  formatedDate[toDayPosition] = dateArray[fromDayPosition];
  formatedDate[toMonthPosition] = dateArray[fromMonthPosition];
  formatedDate[toYearPosition] = formatedYear;

  return formatedDate.join(toFormat[3]);
}

module.exports = formatDate;
