'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat.pop();
  const newSeparator = toFormat.pop();

  const oldDate = date.split(oldSeparator);

  const newDate = toFormat.map(formatPart => {
    const partIndex = fromFormat.indexOf(formatPart);

    if (partIndex < 0) {
      const oldYearFormat = fromFormat.find(
        datePart => datePart.startsWith('Y')
      );
      const oldYear = oldDate[fromFormat.indexOf(oldYearFormat)];

      const newYear = +oldYear < 100
        ? (+oldYear < 30 ? 20 : 19) + oldYear
        : oldYear.slice(2);

      return newYear;
    }

    return oldDate[partIndex];
  }).join(newSeparator);

  return newDate;
}

module.exports = formatDate;
