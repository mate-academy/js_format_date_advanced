'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const object = {};
  const reorderdObject = {};
  const arrayOfDate = date.split(`${fromFormat[3]}`);
  const arrayFromFormat = [...fromFormat];
  const arrayToFormat = [...toFormat];
  const newDateArray = [];
  let newDate = '';

  arrayFromFormat.pop();
  arrayToFormat.pop();

  for (let i = 0; i < arrayFromFormat.length; i++) {
    object[arrayFromFormat[i]] = arrayOfDate[i];
  }

  arrayToFormat.forEach((key) => {
    if (object.hasOwnProperty(key)) {
      reorderdObject[key] = object[key];
    } else if (key === 'YY' && !object.hasOwnProperty(key)) {
      reorderdObject[key] = object['YYYY'].slice(2, object['YYYY'].length);
    } else if (key === 'YYYY' && !object.hasOwnProperty(key)) {
      if (object['YY'] < 30) {
        reorderdObject[key] = `20${object['YY']}`;
      } else {
        reorderdObject[key] = `19${object['YY']}`;
      }
    }
  });

  for (const value of Object.values(reorderdObject)) {
    newDateArray.push(value);
  }

  newDate = newDateArray.join(`${toFormat[3]}`);

  return newDate;
}

module.exports = formatDate;
