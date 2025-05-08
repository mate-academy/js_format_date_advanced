'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];

  const dateParts = date.split(separatorFrom);
  const fromParts = fromFormat.slice(0, 3);
  const toParts = toFormat.slice(0, 3);

  const dateObj = {};

  fromParts.forEach((part, index) => {
    const value = dateParts[index];

    if (part === 'YY') {
      const year = +value;
      const paddedYY = value.padStart(2, '0');
      let fullYear;

      if (year < 30) {
        fullYear = '20' + paddedYY;
      } else {
        fullYear = '19' + paddedYY;
      }

      dateObj['YY'] = paddedYY;
      dateObj['YYYY'] = fullYear;
    } else if (part === 'YYYY') {
      dateObj['YYYY'] = value;
      dateObj['YY'] = value.slice(-2);
    } else {
      dateObj[part] = value;
    }
  });

  return toParts.map((part) => dateObj[part]).join(separatorTo);
}

module.exports = formatDate;
