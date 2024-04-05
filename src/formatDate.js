'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[fromFormat.length - 1]);

  const objectFromFormat = {};

  fromFormat.forEach((format, index) => {
    if (parts[index]) {
      objectFromFormat[format] = parts[index];
    }
  });

  const reorderedObject = {};

  toFormat.forEach((format) => {
    switch (format) {
      case 'YYYY':
        if (objectFromFormat.hasOwnProperty('YYYY')) {
          reorderedObject[format] = objectFromFormat[format];
        } else {
          const year = parseInt(objectFromFormat['YY']);

          reorderedObject[format] =
            year < 30
              ? '20' + objectFromFormat['YY']
              : '19' + objectFromFormat['YY'];
        }
        break;
      case 'YY':
        if (objectFromFormat.hasOwnProperty('YY')) {
          reorderedObject[format] = objectFromFormat[format];
        } else {
          reorderedObject[format] = objectFromFormat['YYYY'].slice(-2);
        }
        break;
      case 'MM':
      case 'DD':
        reorderedObject[format] = objectFromFormat[format];
        break;
    }
  });

  const result = Object.values(reorderedObject);

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
