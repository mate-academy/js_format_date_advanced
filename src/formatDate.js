'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

const getObjectDate = (dateParts, fromFormat) =>
  fromFormat.reduce((objectFormat, format, i) => {
    if (format === 'YY' && dateParts[i].length === 2) {
      objectFormat['YYYY'] =
        dateParts[i] < '30' ? `20${dateParts[i]}` : `19${dateParts[i]}`;
    } else {
      objectFormat[format] = dateParts[i];
    }

    return objectFormat;
  }, {});

const convertYear = (objectDate, toFormat) => {
  if (!objectDate['YY'] && objectDate['YYYY'] && toFormat.includes('YY')) {
    objectDate['YY'] = objectDate['YYYY'].slice(-2);
  }
};

function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat.pop();
  const separatorTo = toFormat.pop();
  const dateParts = date.split(separatorFrom);
  const objectDate = getObjectDate(dateParts, fromFormat);

  convertYear(objectDate, toFormat);

  return toFormat.map((format) => objectDate[format]).join(separatorTo);
}

module.exports = formatDate;
