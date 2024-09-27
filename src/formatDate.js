'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitedDate = date.split(fromFormat[3]);
  const mapDate = {
    [fromFormat[0]]: splitedDate[0],
    [fromFormat[1]]: splitedDate[1],
    [fromFormat[2]]: splitedDate[2],
  };

  const newDate = [];

  for (const typeDate of toFormat.slice(0, 3)) {
    if (mapDate.hasOwnProperty(typeDate)) {
      newDate.push(mapDate[typeDate]);
      continue;
    }

    if (typeDate === 'YYYY') {
      newDate.push(
        mapDate.YY < 30 ? `20${mapDate.YY}` : `19${mapDate.YY}`
      );
    } else {
      newDate.push(mapDate.YYYY.slice(-2));
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
