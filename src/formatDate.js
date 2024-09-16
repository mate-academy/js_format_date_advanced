'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let [newDay, newMonth, newYear] = '';
  let n = 0;
  let result = '';
  let shortNewYear = '';
  let shortOldFormat = '';
  let longNewYear = '';
  const dayMark = 'DD';
  const monthMark = 'MM';
  const shortYearMark = 'YY';
  const longYearMark = 'YYYY';
  const limitYears = 30;
  const twentyCenture = '20';
  const nineteenthCenture = '19';

  for (const oldIndexDate of fromFormat) {
    switch (oldIndexDate) {
      case monthMark:
        newMonth = date.slice(n, (n + 2));
        n = n + 3;
        break;

      case shortYearMark:
        newYear = date.slice(n, (n + 2));
        shortOldFormat = 'yes';
        n = n + 3;

        if (+newYear < limitYears) {
          longNewYear = twentyCenture + newYear;
        } else {
          longNewYear = nineteenthCenture + newYear;
        }

        break;

      case longYearMark:
        newYear = date.slice(n, (n + 4));
        shortNewYear = date.slice((n + 2), (n + 4));
        n = n + 5;
        break;

      case dayMark:
        newDay = date.slice(n, (n + 2));
        n = n + 3;
    }
  }

  for (const newIndexDate of toFormat) {
    switch (newIndexDate) {
      case dayMark:
        result = result + newDay + toFormat.slice(3);

        break;

      case monthMark:
        result = result + newMonth + toFormat.slice(3);

        break;

      case shortYearMark:
        if (shortOldFormat === 'yes') {
          result = result + newYear + toFormat.slice(3);
        } else {
          result = result + shortNewYear + toFormat.slice(3);
        }

        break;

      case longYearMark:
        if (shortOldFormat === 'yes') {
          result = result + longNewYear + toFormat.slice(3);
        } else {
          result = result + newYear + toFormat.slice(3);
        }
    }
  }

  return result.slice(0, -1);
}

module.exports = formatDate;
