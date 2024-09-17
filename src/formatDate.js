'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const year = fromFormat.find(el => el.includes('Y'));
  const yearIndex = fromFormat.indexOf(year);
  const shortYear = 'YY';
  const fullYear = 'YYYY';

  const oldDate = date.split(oldSeparator);
  const newDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (
      !fromFormat.includes(toFormat[i])
      && fromFormat.includes(shortYear)
      && toFormat.includes(fullYear)
    ) {
      newDate.push((Number(oldDate[yearIndex]) < 30)
        ? '20' + oldDate[yearIndex]
        : '19' + oldDate[yearIndex]);
    } else if (!fromFormat.includes(toFormat[i])) {
      newDate.push(oldDate[yearIndex].slice(2));
    } else {
      newDate.push(oldDate[fromFormat.indexOf(toFormat[i])]);
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
