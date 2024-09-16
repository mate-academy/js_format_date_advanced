'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);

  const formatMap = {};

  fromFormat.forEach((token, index) => {
    formatMap[token] = dateParts[index];
  });

  const convertedParts = [];

  toFormat.forEach(token => {
    if (token === 'YYYY') {
      const year = formatMap['YYYY'];

      if (year !== undefined) {
        convertedParts.push(year);
      } else {
        const shortYear = formatMap['YY'];

        if (shortYear < 30) {
          convertedParts.push('20' + shortYear);
        } else {
          convertedParts.push('19' + shortYear);
        }
      }
    } else if (token === 'YY') {
      const year = formatMap['YYYY'];

      if (year !== undefined) {
        convertedParts.push(year.substring(2));
      } else {
        convertedParts.push(formatMap['YY']);
      }
    } else {
      convertedParts.push(formatMap[token]);
    }
  });

  let formattedDate = convertedParts.join(toFormat[toFormat.length - 1]);

  formattedDate = formattedDate.slice(0, -1);

  return formattedDate;
}

module.exports = formatDate;
