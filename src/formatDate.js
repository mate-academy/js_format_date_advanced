'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const fromPartOfTheDate = fromFormat.slice(0, 3);
  const toPartOfTheDate = toFormat.slice(0, 3);
  const currentDate = date.split(fromSeparator);
  const dataDate = {};

  for (let i = 0; i < fromPartOfTheDate.length; i++) {
    dataDate[fromPartOfTheDate[i]] = currentDate[i];
  }

  if (toPartOfTheDate.includes('YY') && dataDate.YYYY) {
    dataDate.YY = dataDate.YYYY.slice(-2);
  } else if (toPartOfTheDate.includes('YYYY') && dataDate.YY) {
    const lastNumbersOfDate = +dataDate.YY;
    const fullYear =
      lastNumbersOfDate < 30
        ? 2000 + lastNumbersOfDate
        : 1900 + lastNumbersOfDate;

    dataDate.YYYY = String(fullYear);
  }

  const newDateParts = [];

  for (let i = 0; i < toPartOfTheDate.length; i++) {
    newDateParts.push(dataDate[toPartOfTheDate[i]]);
  }

  const resFormatDate = newDateParts.join(toSeparator);

  return resFormatDate;
}

module.exports = formatDate;
