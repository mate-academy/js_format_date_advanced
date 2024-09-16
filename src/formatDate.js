'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const oldDateObject = {};
  const newDataObject = {};
  const oldDate = date.split(oldSeparator);
  const newDate = toFormat.slice(0, 3);

  for (let i = 0; i < oldDate.length; i++) {
    oldDateObject[fromFormat[i]] = oldDate[i];
  }

  for (let i = 0; i < newDate.length; i++) {
    newDataObject[newDate[i]] = '';
  }

  for (const key in newDataObject) {
    newDataObject[key] = oldDateObject[key];
  }

  for (const key in newDataObject) {
    if (newDataObject[key] === undefined) {
      if (key === 'YY') {
        newDataObject[key] = oldDateObject['YYYY'].slice(2, 4);
      } else {
        if (oldDateObject['YY'] < 30) {
          newDataObject[key] = '20' + oldDateObject['YY'];
        } else {
          newDataObject[key] = '19' + oldDateObject['YY'];
        }
      }
    }
  }

  for (const key in newDataObject) {
    result.push(newDataObject[key]);
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
