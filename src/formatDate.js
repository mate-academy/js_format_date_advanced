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
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const YEAR_FORMAT_TWO_CHARS = 'YY';
  const YEAR_FORMAT_FOUR_CHARS = 'YYYY';
  const XX_CENTURE = '19';
  const XXI_CENTURE = '20';
  const XXI_CENTURE_MAX_YEAR = 30;
  const SEPARATOR_INDEX = 3;

  const fromSeparator = fromFormat[SEPARATOR_INDEX];
  const toSeparator = toFormat[SEPARATOR_INDEX];
  const toFormatKeys = toFormat.slice(0, SEPARATOR_INDEX);

  const dateParts = date.split(fromSeparator);

  const dateWithFormat = dateParts.reduce((prev, part, index) => {
    const formatKey = fromFormat[index];

    return { ...prev, [formatKey]: part };
  }, {});

  const formatedDateParts = toFormatKeys.map((formatKey) => {
    if (formatKey in dateWithFormat) {
      return dateWithFormat[formatKey];
    }

    const year = dateWithFormat[YEAR_FORMAT_TWO_CHARS]
      || dateWithFormat[YEAR_FORMAT_FOUR_CHARS];

    if (formatKey === YEAR_FORMAT_TWO_CHARS) {
      return year.slice(2);
    }

    const centuary = (+year < XXI_CENTURE_MAX_YEAR) ? XXI_CENTURE : XX_CENTURE;

    return centuary + year;
  });

  return formatedDateParts.join(toSeparator);
}

module.exports = formatDate;
