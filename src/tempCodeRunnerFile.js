'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[3]);

  const dateObj = {
    [fromFormat[0]]: parts[0],
    [fromFormat[1]]: parts[1],
    [fromFormat[2]]: parts[2],
  };

  const ensureYYYY = (input) => {
    if (!('YYYY' in input) && 'YY' in input) {
      const yy = input['YY'];

      input['YYYY'] = Number(yy) < 30 ? '20' + yy : '19' + yy;
    }
  };

  const ensureYY = (input) => {
    if (!('YY' in input) && 'YYYY' in input) {
      const yyyy = input['YYYY'];

      input['YY'] = String(yyyy).slice(-2);
    }
  };

  const result = toFormat.slice(0, 3).map((part) => {
    if (part === 'YYYY') {
      ensureYYYY(dateObj);
    }

    if (part === 'YY') {
      ensureYY(dateObj);
    }

    return dateObj[part];
  });

  return result.join(toFormat[3]);
}

module.exports = formatDate;
