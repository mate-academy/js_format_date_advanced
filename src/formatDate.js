'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];

  const dateParts = date.split(oldSeparator);
  const fromParts = fromFormat.slice(0, 3);
  const toParts = toFormat.slice(0, 3);

  const resultParts = [];

  for (const part of toParts) {
    if (part === 'YY' || part === 'YYYY') {
      let yearIndex = fromParts.indexOf('YYYY');
      let yearFormat = 'YYYY';

      if (yearIndex === -1) {
        yearIndex = fromParts.indexOf('YY');
        yearFormat = 'YY';
      }

      let year = dateParts[yearIndex];

      if (yearFormat === 'YYYY' && part === 'YY') {
        year = year.slice(-2);
      }

      if (yearFormat === 'YY' && part === 'YYYY') {
        if (Number(year) < 30) {
          year = `20${year}`;
        } else {
          year = `19${year}`;
        }
      }

      resultParts.push(year);
    } else {
      const index = fromParts.indexOf(part);

      resultParts.push(dateParts[index]);
    }
  }

  return resultParts.join(newSeparator);
}

module.exports = formatDate;
