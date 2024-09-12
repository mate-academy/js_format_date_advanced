'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const FULL_YEAR = 'YYYY';
  const SHORT_YEAR = 'YY';

  const TWENTIETH_CENTURY = '20';
  const NINETIETH_CENTURY = '19';

  const CONVERT_YEAR = 30;

  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];

  const splittedDateFrom = date.split(separatorFrom);
  const objDateFrom = {};

  const formattedDateTo = [];

  for (let i = 0; i < splittedDateFrom.length; i++) {
    objDateFrom[fromFormat[i]] = splittedDateFrom[i];
  }

  for (const datePart in objDateFrom) {
    const dateValue = objDateFrom[datePart];

    if (toFormat.includes(datePart)) {
      formattedDateTo[toFormat.indexOf(datePart)] = dateValue;
      continue;
    }

    if (datePart.length === FULL_YEAR.length) {
      formattedDateTo[toFormat.indexOf(SHORT_YEAR)] = dateValue.slice(2);
      continue;
    }

    if (datePart.length === SHORT_YEAR.length) {
      formattedDateTo[toFormat.indexOf(FULL_YEAR)] = dateValue < CONVERT_YEAR
        ? TWENTIETH_CENTURY + dateValue
        : NINETIETH_CENTURY + dateValue;
    }
  }

  return formattedDateTo.join(separatorTo);
}

module.exports = formatDate;
