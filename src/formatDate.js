'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let divider = fromFormat[fromFormat.length - 1];
  const splitedDate = date.split(divider);

  const dateType = {};
  const sortedDate = [];

  for (let i = 0; i < splitedDate.length; i++) {
    dateType[fromFormat[i]] = splitedDate[i];
  }

  for (let i = 0; i < splitedDate.length; i++) {
    const newFormat = toFormat[i];

    if (dateType.hasOwnProperty(newFormat)) {
      sortedDate.push(dateType[newFormat]);
      continue;
    }

    if (newFormat === 'YY') {
      const prevFormat = 'YYYY';

      sortedDate.push(dateType[prevFormat].slice(2));
    }

    if (newFormat === 'YYYY') {
      const prevFormat = 'YY';

      if (dateType[prevFormat] < 30) {
        sortedDate.push(`20${dateType[prevFormat]}`);
        continue;
      }

      sortedDate.push(`19${dateType[prevFormat]}`);
    }
  }

  divider = toFormat[toFormat.length - 1];

  return sortedDate.join(divider);
}

module.exports = formatDate;
