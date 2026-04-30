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

  const parsedDate = {};

  for (let i = 0; i < 3; i++) {
    parsedDate[fromFormat[i]] = dateParts[i];
  }

  const dateMap = {
    DD: parsedDate['DD'],
    MM: parsedDate['MM'],
    YYYY: parsedDate['YYYY'],
    YY: parsedDate['YY'],
  };

  if (dateMap.YYYY && !dateMap.YY) {
    dateMap.YY = dateMap.YYYY.slice(-2);
  }

  if (dateMap.YY && !dateMap.YYYY) {
    const yyNum = parseInt(dateMap.YY, 10);

    if (yyNum < 30) {
      dateMap.YYYY = '20' + dateMap.YY;
    } else {
      dateMap.YYYY = '19' + dateMap.YY;
    }
  }

  const resultParts = [];

  for (let i = 0; i < 3; i++) {
    resultParts.push(dateMap[toFormat[i]]);
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
