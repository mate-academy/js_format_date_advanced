'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.find(
    (format) => !['YYYY', 'MM', 'DD', 'YY'].includes(format),
  );
  const toSeparator = toFormat.find(
    (format) => !['YYYY', 'MM', 'DD', 'YY'].includes(format),
  );

  const dateParts = date.split(fromSeparator);

  const dateMap = {};

  fromFormat.forEach((part, index) => {
    if (part !== fromSeparator) {
      dateMap[part] = dateParts[index];
    }
  });

  const resultParts = toFormat.map((format) => {
    if (format === 'YYYY') {
      const yy = dateMap['YY'];

      if (yy) {
        return (parseInt(yy) < 30 ? '20' : '19') + yy;
      }

      return dateMap['YYYY'];
    }

    if (format === 'YY') {
      const yyyy = dateMap['YYYY'];

      if (yyyy) {
        return yyyy.slice(-2);
      }

      return dateMap['YY'];
    }

    return dateMap[format];
  });

  let formattedDate = resultParts.join(toSeparator);

  if (formattedDate.endsWith(toSeparator)) {
    formattedDate = formattedDate.slice(0, -1);
  }

  return formattedDate;
}

module.exports = formatDate;
