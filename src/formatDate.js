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
  const dateMap = {};

  fromFormat.slice(0, 3).forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  const convertToYYYY = (yy) => (parseInt(yy, 10) < 30 ? `20${yy}` : `19${yy}`);
  const convertToYY = (yyyy) => yyyy.slice(-2);

  const newDateFormat = toFormat.slice(0, 3).map((part) => {
    if (part === 'YYYY') {
      return dateMap['YYYY'] || convertToYYYY(dateMap['YY']);
    }

    if (part === 'YY') {
      return dateMap['YY'] || convertToYY(dateMap['YYYY']);
    }

    return dateMap[part];
  });

  return newDateFormat.join(separatorTo);
}

module.exports = formatDate;
