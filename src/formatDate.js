'use strict';

/**
 /**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[3]);

  const map = {
    [fromFormat[0]]: parts[0],
    [fromFormat[1]]: parts[1],
    [fromFormat[2]]: parts[2],
  };

  if (map['YYYY'] && !map['YY']) {
    map['YY'] = map['YYYY'].slice(-2);
  }

  if (map['YY'] && !map['YYYY']) {
    const yearNum = Number(map['YY']);

    if (yearNum < 30) {
      map['YYYY'] = '20' + map['YY'];
    } else {
      map['YYYY'] = '19' + map['YY'];
    }
  }

  const result = [map[toFormat[0]], map[toFormat[1]], map[toFormat[2]]];

  return result.join(toFormat[3]);
}
module.exports = formatDate;
