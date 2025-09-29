'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const days = date.split(fromFormat[3]);
  const map = {
    [fromFormat[0]]: days[0],
    [fromFormat[1]]: days[1],
    [fromFormat[2]]: days[2],
  };

  const calendar = [];

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'YYYY' && map['YY']) {
      if (parseInt(map['YY'], 10) < 30) {
        map['YYYY'] = '20' + map['YY'];
      } else {
        map['YYYY'] = '19' + map['YY'];
      }
    }

    if (toFormat[i] === 'YY' && map['YYYY']) {
      map['YY'] = map['YYYY'].slice(-2);
    }
  }

  calendar.push(map[toFormat[0]], map[toFormat[1]], map[toFormat[2]]);

  return calendar.join(toFormat[3]);
}

module.exports = formatDate;
