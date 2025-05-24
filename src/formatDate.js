'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromDate = date.split(fromFormat[fromFormat.length - 1]);
  const toDate = [];
  let formatYear = '';

  for (let i = 0; i < 3; i++) {
    const format = toFormat[i];

    if (
      fromFormat[i].toUpperCase() === 'YY' ||
      fromFormat[i].toUpperCase() === 'YYYY'
    ) {
      formatYear = fromFormat[i];
    }

    if (format.toUpperCase() === 'DD') {
      toDate[i] = fromDate[fromFormat.indexOf(format)];

      continue;
    }

    if (format.toUpperCase() === 'MM') {
      toDate[i] = fromDate[fromFormat.indexOf(format)];
      continue;
    }

    if (!fromFormat.includes(format)) {
      const year = fromDate[fromFormat.indexOf(formatYear)];

      if (formatYear.length === 4) {
        toDate[i] = year.slice(2);
        continue;
      }

      toDate[i] = year < 30 ? `20${year}` : `19${year}`;
      continue;
    }

    toDate[i] = fromDate[fromFormat.indexOf(format)];
  }

  return toDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
