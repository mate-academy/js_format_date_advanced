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
  const dateObject = date
    .split(fromSeparator)
    .reduce((obj, part, i) => (obj[fromFormat[i]] = part) && obj, {});

  return toFormat
    .slice(0, -1)
    .map(placeholder => {
      let part = dateObject[placeholder];

      if (!part) {
        if (placeholder === 'YY') {
          part = dateObject['YYYY'].slice(2);
        } else {
          part = dateObject['YY'];
          part = (+part < 30 ? '20' : '19') + part;
        }
      }

      return part;
    })
    .join(toSeparator);
}

module.exports = formatDate;
