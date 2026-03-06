'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [, , , fromdivider] = fromFormat;
  const [, , , todivider] = toFormat;
  const elementDate = date.split(fromdivider);
  let year, month, day;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        year = elementDate[i];
        break;
      case 'MM':
        month = elementDate[i];
        break;
      case 'DD':
        day = elementDate[i];
        break;
    }
  }

  if (year.length === 2) {
    year = +year < 30 ? '20' + year : '19' + year;
  }

  const shortYear = year.slice(-2);

  const mapDate = {
    DD: day,
    MM: month,
    YY: shortYear,
    YYYY: year,
  };

  const newDate0 = mapDate[toFormat[0]];
  const newDate1 = mapDate[toFormat[1]];
  const newDate2 = mapDate[toFormat[2]];

  return `${newDate0}${todivider}${newDate1}${todivider}${newDate2}`;
}

module.exports = formatDate;
