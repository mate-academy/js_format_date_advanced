'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const gapPrevious = fromFormat[3];
  const gapPresent = toFormat[3];

  const DAY_FORMAT = 'DD';
  const MONTH_FORMAT = 'MM';
  const YEAR_LONG_FORMAT = 'YYYY';
  const YEAR_SHORT_FORMAT = 'YY';
  const LESS_THIRTY_YEAR = '20';
  const ABOVE_THIRTY_YEAR = '19';

  const datePrevForm = date.split(gapPrevious);
  const datePresForm = date.split(gapPrevious);

  datePresForm[toFormat.indexOf(DAY_FORMAT)] = datePrevForm[fromFormat.indexOf(DAY_FORMAT)];
  datePresForm[toFormat.indexOf(MONTH_FORMAT)] = datePrevForm[fromFormat.indexOf(MONTH_FORMAT)];

  const prevYearPos = fromFormat.includes(YEAR_LONG_FORMAT)
    ? fromFormat.indexOf(YEAR_LONG_FORMAT)
    : fromFormat.indexOf(YEAR_SHORT_FORMAT);
  const presYearPos = toFormat.includes(YEAR_LONG_FORMAT)
    ? toFormat.indexOf(YEAR_LONG_FORMAT)
    : toFormat.indexOf(YEAR_SHORT_FORMAT);

  if (fromFormat.includes(YEAR_LONG_FORMAT) && toFormat.includes(YEAR_LONG_FORMAT)) {
    datePresForm[presYearPos] = datePrevForm[prevYearPos];
  } else if (fromFormat.includes(YEAR_LONG_FORMAT) && toFormat.includes(YEAR_SHORT_FORMAT)) {
    datePresForm[prevYearPos] = datePrevForm[presYearPos].slice(-2);
  } else if (fromFormat.includes(YEAR_SHORT_FORMAT) && toFormat.includes(YEAR_LONG_FORMAT)) {
    if (datePresForm[prevYearPos] < 30) {
      datePresForm[prevYearPos] = LESS_THIRTY_YEAR + datePrevForm[presYearPos];
    } else {
      datePresForm[prevYearPos] = ABOVE_THIRTY_YEAR + datePrevForm[presYearPos];
    }
  }

  return datePresForm.join(gapPresent);
}

module.exports = formatDate;
