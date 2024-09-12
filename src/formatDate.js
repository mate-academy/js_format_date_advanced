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
  const splitDate = date.split(fromFormat[3]);

  const year = splitDate[fromFormat.indexOf('YY')]
    || splitDate[fromFormat.indexOf('YYYY')];
  const month = splitDate[fromFormat.indexOf('MM')];
  const day = splitDate[fromFormat.indexOf('DD')];

  for (const period of toFormat) {
    if (period === 'DD') {
      formatedDate.push(day);
    }

    if (period === 'MM') {
      formatedDate.push(month);
    }

    if (period === 'YY' && year.length === 2) {
      formatedDate.push(year);
    }

    if (period === 'YY' && year.length === 4) {
      formatedDate.push(year.slice(2));
    }

    if (period === 'YYYY' && year.length === 4) {
      formatedDate.push(year);
    }

    if (period === 'YYYY' && year.length === 2) {
      formatedDate.push((year < 30 ? '20' : '19') + year);
    }
  }

  return formatedDate.join(toFormat[3]);
}

module.exports = formatDate;
