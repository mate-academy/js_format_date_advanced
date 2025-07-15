'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];

  const parts = date.split(oldSeparator);
  const map = {};

  for (let i = 0; i < 3; i++) {
    const formatKey = fromFormat[i];
    let value = parts[i];

    switch (formatKey) {
      case 'YY': {
        const num = parseInt(value, 10);

        value = num < 30 ? '20' + value : '19' + value;
        map['YYYY'] = value;
        map['YY'] = value.slice(2);
        break;
      }

      case 'YYYY': {
        map['YYYY'] = value;
        map['YY'] = value.slice(2);
        break;
      }

      default: {
        map[formatKey] = value;
      }
    }
  }

  const formatted = toFormat.slice(0, 3).map((part) => map[part]);

  return formatted.join(newSeparator);
}

module.exports = formatDate;
