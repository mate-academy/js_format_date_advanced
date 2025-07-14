'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const dataDescription = {};

  date.split(fromSeparator).forEach((item, idx) => {
    dataDescription[fromFormat[idx]] = item;
  });

  const fromYearFormat = fromFormat.includes('YYYY') ? 'YYYY' : 'YY';
  const toYearFormat = toFormat.includes('YYYY') ? 'YYYY' : 'YY';

  let year = dataDescription[fromYearFormat];

  if (fromYearFormat === 'YYYY' && toYearFormat === 'YY') {
    year = year.slice(2);
  } else if (fromYearFormat === 'YY' && toYearFormat === 'YYYY') {
    const numYear = parseInt(year, 10);

    if (numYear < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  dataDescription[toYearFormat] = year;

  if (fromYearFormat !== toYearFormat) {
    delete dataDescription[fromYearFormat];
  }

  const datePartsOrder = toFormat.slice(0, 3);

  const result = datePartsOrder
    .map((part) => dataDescription[part])
    .join(toSeparator);

  return result;
}

module.exports = formatDate;
