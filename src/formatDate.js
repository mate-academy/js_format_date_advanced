'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *

 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const FORMAT_YEAR = 'YYYY';
  const FORMAT_YEAR_SHORT = 'YY';
  const FORMAT_MONTH = 'MM';
  const FORMAT_DAY = 'DD';

  const CENTURY_TWENTIETH = '20';
  const CENTURY_NINETEENTH = '19';
  const CENTURY_YEAR = 30;
  const REDUCED_YEAR = 2;

  const separatorOld = fromFormat[3];
  const separatorNew = toFormat[3];
  const orderDateOld = date.split(separatorOld);

  const typeDates = {
    year: '',
    month: '',
    day: '',
  };

  const orderDateNew = [];

  for (let dateFormat = 0; dateFormat < fromFormat.length; dateFormat++) {
    switch (fromFormat[dateFormat]) {
      case FORMAT_YEAR:
      case FORMAT_YEAR_SHORT:
        typeDates.year = orderDateOld[dateFormat];
        break;

      case FORMAT_MONTH:
        typeDates.month = orderDateOld[dateFormat];
        break;

      case FORMAT_DAY:
        typeDates.day = orderDateOld[dateFormat];
        break;
    }
  };

  const changeShortYear = typeDates.year.slice(-2);

  for (const dateFormatNew of toFormat) {
    switch (dateFormatNew) {
      case FORMAT_YEAR:
        if (typeDates.year.length === REDUCED_YEAR) {
          if (typeDates.year >= CENTURY_YEAR) {
            typeDates.year = `${CENTURY_NINETEENTH}${typeDates.year}`;
          } else {
            typeDates.year = `${CENTURY_TWENTIETH}${typeDates.year}`;
          }
        }
        orderDateNew.push(typeDates.year);
        break;

      case FORMAT_YEAR_SHORT:
        if (typeDates.year.length > REDUCED_YEAR) {
          typeDates.year = changeShortYear;
        }
        orderDateNew.push(typeDates.year);
        break;

      case FORMAT_MONTH:
        orderDateNew.push(typeDates.month);
        break;

      case FORMAT_DAY:
        orderDateNew.push(typeDates.day);
        break;
    }
  };

  const formatDateNew = orderDateNew.join(separatorNew);

  return formatDateNew;
}

module.exports = formatDate;
