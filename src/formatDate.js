'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const CENTURY_NINETEEN = 19;
  const CENTURY_TWENTY = 20;

  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];

  const dateParts = date.split(separatorFrom);
  const dateObject = {};

  fromFormat.slice(0, 3).forEach((part, index) => {
    dateObject[part] = dateParts[index];
  });

  if (dateObject['YYYY']) {
    dateObject['YY'] = dateObject['YYYY'].slice(-2);
  } else if (dateObject['YY']) {
    const year = parseInt(dateObject['YY'], 10);

    dateObject['YYYY'] =
      year < 30
        ? CENTURY_TWENTY + dateObject['YY']
        : CENTURY_NINETEEN + dateObject['YY'];
  }

  const newDateParts = toFormat.slice(0, 3).map((part) => dateObject[part]);

  return newDateParts.join(separatorTo);
}

module.exports = formatDate;
