'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);
  const dateObj = {};
  const currentYear = new Date().getFullYear().toString();

  for (let i = 0; i < dateArr.length; i++) {
    dateObj[fromFormat[i]] = dateArr[i];
  }

  const fromYearFormat = toFormat.find((el) => el.startsWith('Y'));
  const toYearFormat = fromFormat.find((el) => el.startsWith('Y'));

  if (fromYearFormat.length === 4 && toYearFormat.length === 2) {
    dateObj[fromYearFormat]
      = dateObj[toYearFormat] * 1 > Number(currentYear.slice(-2))
        ? '19' + dateObj[toYearFormat]
        : '20' + dateObj[toYearFormat];
  }

  if (fromYearFormat.length === 2 && toYearFormat.length === 4) {
    dateObj[fromYearFormat] = dateObj[toYearFormat].slice(-2);
  }

  const properDateString = toFormat
    .slice(0, -1)
    .map((el) => dateObj[el])
    .join(toFormat[toFormat.length - 1]);

  return properDateString;
}

module.exports = formatDate;
