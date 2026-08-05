'use strict';

const FULL_YEAR = 'YYYY';
const SHORT_YEAR = 'YY';
const SHORT_YEAR_LENGTH = 2;
const CENTURY_BORDER = 30;
const CURRENT_CENTURY = '20';
const PREVIOUS_CENTURY = '19';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const fromParts = fromFormat.slice(0, -1);
  const toParts = toFormat.slice(0, -1);
  const dateValues = date.split(fromSeparator);

  const parsedDate = fromParts.reduce(
    (result, part, index) => ({
      ...result,
      [part]: dateValues[index],
    }),
    {},
  );

  const newDateValues = toParts.map((part) => {
    if (parsedDate[part] !== undefined) {
      return parsedDate[part];
    }

    if (part === SHORT_YEAR) {
      return parsedDate[FULL_YEAR].slice(-SHORT_YEAR_LENGTH);
    }

    const shortYear = parsedDate[SHORT_YEAR];
    const century =
      Number(shortYear) < CENTURY_BORDER ? CURRENT_CENTURY : PREVIOUS_CENTURY;

    return century + shortYear;
  });

  return newDateValues.join(toSeparator);
}

module.exports = formatDate;
