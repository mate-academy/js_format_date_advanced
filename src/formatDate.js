'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const FIRST_SPLITTER = fromFormat[3];
  const LONG_YEAR_FORMAT = 'YYYY';
  const SHORT_YEAR_FORMAT = 'YY';
  const MONTH_FORMAT = 'MM';
  const DAY_FORMAT = 'DD';


  const dateSplit = date.split(FIRST_SPLITTER);

  let year = '';

  if (fromFormat.indexOf(LONG_YEAR_FORMAT) !== -1) {
    year = dateSplit[fromFormat.indexOf(LONG_YEAR_FORMAT)];
  }

  if (fromFormat.indexOf(SHORT_YEAR_FORMAT) !== -1) {
    year = dateSplit[fromFormat.indexOf(SHORT_YEAR_FORMAT)];
  }

  const month = dateSplit[fromFormat.indexOf(MONTH_FORMAT)];
  const day = dateSplit[fromFormat.indexOf(DAY_FORMAT)];

  const dateRearranged = [];

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case (LONG_YEAR_FORMAT):
        if (year.length === 2) {
          if (year < 30) {
            dateRearranged.push(`20${year}`);
          } else {
            dateRearranged.push(`19${year}`);
          }
        } else {
          dateRearranged.push(year);
        }
        break;
      case (SHORT_YEAR_FORMAT):
        if (year.length === 4) {
          dateRearranged.push(year.slice(-2));
        } else {
          dateRearranged.push(year);
        }
        break;
      case (MONTH_FORMAT):
        dateRearranged.push(month);
        break;
      case (DAY_FORMAT):
        dateRearranged.push(day);
        break;
    }
  }

  return dateRearranged.join(toFormat[3]);
}

module.exports = formatDate;
