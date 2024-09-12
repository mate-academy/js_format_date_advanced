'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const yearFormatFull = 'YYYY';
  const yearFormatShort = 'YY';
  const dayFormat = 'DD';
  const monthFormat = 'MM';

  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const splitDate = date.split(oldSeparator);

  const newDate = [];
  const temp = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case yearFormatFull:
        temp[splitDate[i]] = splitDate[i];
        break;

      case yearFormatShort:
        temp[yearFormatFull] = (splitDate[i] >= 30) ? `19${splitDate[i]}` : `20${splitDate[i]}`;
        break;
    }

    temp[fromFormat[i]] = splitDate[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case dayFormat:
        newDate.push(temp[dayFormat]);
        break;

      case monthFormat:
        newDate.push(temp[monthFormat]);
        break;

      case yearFormatFull:
        newDate.push(temp[yearFormatFull]);
        break;

      case yearFormatShort:
        newDate.push(temp[yearFormatFull].slice(-2));
        break;

      default:
        break;
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
