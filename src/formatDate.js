'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const FORMAT_PARTS_COUNT = 3;
  const YEAR_THRESHOLD = 30;

  const fromSeparator = fromFormat[FORMAT_PARTS_COUNT];
  const toSeparator = toFormat[FORMAT_PARTS_COUNT];
  const dateParts = date.split(fromSeparator);
  const dateValues = {};

  for (let i = 0; i < FORMAT_PARTS_COUNT; i++) {
    dateValues[fromFormat[i]] = dateParts[i];
  }

  if (dateValues.YYYY) {
    dateValues.YY = dateValues.YYYY.slice(-2);
  }

  if (dateValues.YY) {
    const century = Number(dateValues.YY) < YEAR_THRESHOLD ? '20' : '19';

    dateValues.YYYY = century + dateValues.YY;
  }

  const formattedDateParts = toFormat
    .slice(0, FORMAT_PARTS_COUNT)
    .map((formatPart) => dateValues[formatPart]);

  return formattedDateParts.join(toSeparator);
}

module.exports = formatDate;
