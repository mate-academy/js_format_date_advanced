'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat.pop();
  const separatorTo = toFormat.pop();

  const dateParts = date.split(separatorFrom);

  const dateMap = {};

  fromFormat.forEach((key, index) => {
    dateMap[key] = dateParts[index];
  });

  if (dateMap.YY) {
    const year = parseInt(dateMap.YY, 10);

    if (year < 30) {
      dateMap.YYYY = `20${dateMap.YY}`;
    } else {
      dateMap.YYYY = `19${dateMap.YY}`;
    }
  }

  if (dateMap.YYYY && toFormat.includes('YY')) {
    dateMap.YY = dateMap.YYYY.slice(-2);
  }

  const newDate = toFormat.map((key) => dateMap[key]).join(separatorTo);

  return newDate;
}

module.exports = formatDate;
