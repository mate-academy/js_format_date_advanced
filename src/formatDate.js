'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const FROM_DATE_SPLITER = fromFormat[3];
  const TO_DATE_SPLITER = toFormat[3];
  const YYYY_FORMAT = 'YYYY';
  const YY_FORMAT = 'YY';
  const MM_FORMAT = 'MM';
  const THIRTY_YEARS = '30';
  const TWENTY_YEARS = '20';
  const NINETEEN_YEARS = '19';

  const splitDate = date.split(FROM_DATE_SPLITER);

  let year = '';
  let month = '';
  let day = '';

  let ans = '';

  for (let i = 0; i < fromFormat.length - 1; ++i) {
    const current = fromFormat[i];

    switch (current) {
      case YYYY_FORMAT:
      case YY_FORMAT:
        year = splitDate[i];
        break;
      case MM_FORMAT:
        month = splitDate[i];
        break;
      default:
        day = splitDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; ++i) {
    const current = toFormat[i];

    switch (current) {
      case YYYY_FORMAT:
        if (year.length === 2) {
          ans += year < THIRTY_YEARS ? TWENTY_YEARS : NINETEEN_YEARS;
          ans += year;
        } else {
          ans += year;
        }
        break;
      case YY_FORMAT:
        if (year.length === 4) {
          ans += year.slice(2);
        } else {
          ans += year;
        }
        break;
      case MM_FORMAT:
        ans += month;
        break;
      default:
        ans += day;
    }

    if (i !== toFormat.length - 2) {
      ans += TO_DATE_SPLITER;
    }
  }

  return ans;
}

module.exports = formatDate;
