'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const typeFormat = toFormat.slice(0, 3);
  const symbolFromFormat = fromFormat[3];
  const symbolToFormat = toFormat[3];
  const splitDate = date.split(symbolFromFormat);
  const mapDate = {
    [fromFormat[0]]: splitDate[0],
    [fromFormat[1]]: splitDate[1],
    [fromFormat[2]]: splitDate[2],
  };

  const newFormatDate = [];

  for (const typeDate of typeFormat) {
    if (mapDate.hasOwnProperty(typeDate)) {
      newFormatDate.push(mapDate[typeDate]);
      continue;
    }

    if (typeDate === 'YY') {
      newFormatDate.push(mapDate.YYYY.slice(-2));
    } else {
      newFormatDate.push(
        mapDate.YY < 30 ? `20${mapDate.YY}` : `19${mapDate.YY}`
      );
    }
  }

  return newFormatDate.join(symbolToFormat);
}

module.exports = formatDate;
