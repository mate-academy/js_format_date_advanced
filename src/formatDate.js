'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const char = fromFormat.at(-1);
  const dateArr = date.split(char);
  const day = fromFormat.indexOf('DD');
  const month = fromFormat.indexOf('MM');
  const years = fromFormat.indexOf('YYYY');
  const year2 = fromFormat.indexOf('YY');
  const finalParts = [];

  for (let i = 0; i < toFormat.length; i++) {
    const what = toFormat[i];

    if (what === 'DD') {
      finalParts.push(dateArr[day]);
    }

    if (what === 'MM') {
      finalParts.push(dateArr[month]);
    }

    if (what === 'YYYY') {
      let fullYear = dateArr[years] || dateArr[year2];

      if (fullYear.length === 2) {
        fullYear = Number(fullYear) < 30 ? '20' + fullYear : '19' + fullYear;
      }

      finalParts.push(fullYear);
    }

    if (what === 'YY') {
      const fullYear = dateArr[years] || dateArr[year2];

      finalParts.push(fullYear.slice(-2));
    }
  }

  return finalParts.join(toFormat.at(-1));
}

module.exports = formatDate;
