'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const YEAR_PERIOD = 30;

  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];
  const dateArray = date.split(separatorFrom);
  const dateObject = {};
  const formattedDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const key = toFormat[i];
    let value = dateObject[key];
    const fullYearFormat = dateObject.YYYY;
    const halfYearFormat = dateObject.YY;

    if (value === undefined) {
      if (key === 'YY') {
        value = fullYearFormat.slice(2);
      } else {
        value = +halfYearFormat < YEAR_PERIOD ? `20${halfYearFormat}` : `19${halfYearFormat}`;
      }
    }

    formattedDate.push(value);
  }

  return formattedDate.join(separatorTo);
}

module.exports = formatDate;
