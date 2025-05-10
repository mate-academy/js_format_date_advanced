'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[3];
  const toSep = toFormat[3];

  const parts = date.split(fromSep);
  const data = {};

  for (let i = 0; i < 3; i++) {
    data[fromFormat[i]] = parts[i];
  };

  const result = toFormat.slice(0, 3).map((key) => {
    if (key === 'YYYY') {
      if (data['YYYY']) {
        return data['YYYY'];
      };

      if (data['YY']) {
        const year = parseInt(data['YY'], 10);

        return year < 30 ? '20' + data['YY'] : '19' + data['YY'];
      };
    };

    if (key === 'YY') {
      if (data['YY']) {
        return data['YY'];
      };

      if (data['YYYY']) {
        return data['YYYY'].slice(2);
      };
    };

    return data[key];
  });

  return result.join(toSep);
}

module.exports = formatDate;
