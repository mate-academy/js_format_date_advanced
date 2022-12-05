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
  const sortedDate = {};

  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const dateArray = date.split(oldSeparator);

  const days = 'DD';
  const months = 'MM';
  const shortYears = 'YY';
  const fullYears = 'YYYY';

  for (let i = 0; i < dateArray.length; i++) {
    sortedDate[fromFormat[i]] = dateArray[i];
  }

  for (let i = 0; i < dateArray.length; i++) {
    switch (toFormat[i]) {
      case days:
        formatedDate.push(sortedDate[days]);
        break;

      case months:
        formatedDate.push(sortedDate[months]);
        break;

      case fullYears:
        let lengthenedYears;

        if (sortedDate[shortYears] < 30) {
          lengthenedYears = `20${sortedDate[shortYears]}`;
        } else {
          lengthenedYears = `19${sortedDate[shortYears]}`;
        }

        if (sortedDate[shortYears]) {
          formatedDate.push(lengthenedYears);
        } else {
          formatedDate.push(sortedDate[fullYears]);
        }
        break;

      case shortYears:
        if (sortedDate[fullYears]) {
          const shortenedYear = sortedDate[fullYears].slice(-2);

          formatedDate.push(shortenedYear);
        } else {
          formatedDate.push(sortedDate[shortYears]);
        }
        break;

      default:
        break;
    }
  }

  return formatedDate.join(newSeparator);
}

module.exports = formatDate;
