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

  const dateParts = date.split(fromSeparator);
  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  let year = dateMap.YYYY || dateMap.YY;

  if (dateMap.YY && !dateMap.YYYY) {
    const shortYear = Number(dateMap.YY);

    year = shortYear < 30 ? `20${dateMap.YY}` : `19${dateMap.YY}`;
  }

  const formattedDate = {
    DD: dateMap.DD,
    MM: dateMap.MM,
    YYYY: year,
    YY: year.slice(-2),
  };

  return [
    formattedDate[toFormat[0]],
    formattedDate[toFormat[1]],
    formattedDate[toFormat[2]],
  ].join(toSeparator);
}

module.exports = formatDate;
