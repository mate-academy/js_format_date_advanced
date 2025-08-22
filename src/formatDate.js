'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];

  const parts = date.split(separatorFrom);

  const dateObj = {};

  fromFormat.slice(0, 3).forEach((part, i) => {
    dateObj[part] = parts[i];
  });

  if (dateObj.YY && !dateObj.YYYY) {
    const yy = parseInt(dateObj.YY, 10);

    dateObj.YYYY =
      yy < 30
        ? `20${dateObj.YY.padStart(2, '0')}`
        : `19${dateObj.YY.padStart(2, '0')}`;
  }

  if (dateObj.YYYY && !dateObj.YY) {
    dateObj.YY = dateObj.YYYY.slice(-2);
  }

  const newDate = toFormat
    .slice(0, 3)
    .map((part) => dateObj[part])
    .join(separatorTo);

  return newDate;
}

module.exports = formatDate;
