'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [, , , f4] = fromFormat;
  const [t1, t2, t3, t4] = toFormat;
  const dateItems = date.split(f4);
  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = dateItems[i];
  }

  const yearKey = fromFormat.find((item) => item === 'YYYY' || item === 'YY');

  if (yearKey && dateMap[yearKey]) {
    const yearValue = dateMap[yearKey];

    const shortYear = yearValue.length === 4 ? yearValue.slice(-2) : yearValue;

    let fullYear = yearValue;

    if (yearValue.length === 2) {
      const numYear = parseInt(yearValue, 10);

      fullYear = (numYear >= 30 ? '19' : '20') + yearValue;
    }

    dateMap['YY'] = shortYear;
    dateMap['YYYY'] = fullYear;
  }

  const newDateItems = [dateMap[t1], dateMap[t2], dateMap[t3]];

  return newDateItems.join(t4);
}

module.exports = formatDate;
