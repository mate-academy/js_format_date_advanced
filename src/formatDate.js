/* eslint-disable no-console */
'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldFormat = [...fromFormat];
  const newFormat = [...toFormat];

  const fromSeperator = oldFormat.pop();
  const toSeperator = newFormat.pop();
  const splitedData = date.split(fromSeperator);
  const fromDateObject = {};
  const formatedArray = [];

  for (let i = 0; i < oldFormat.length; i++) {
    fromDateObject[oldFormat[i]] = splitedData[i];
  }

  console.log(`from ${JSON.stringify(fromDateObject)}`);

  for (const formatData of newFormat) {
    let value = fromDateObject[formatData];

    if (formatData === 'YY' && !Object.hasOwn(fromDateObject, 'YY')) {
      value = fromDateObject.YYYY.slice(2);
    }

    if (formatData === 'YYYY' && !Object.hasOwn(fromDateObject, 'YYYY')) {
      value =
        fromDateObject.YY >= 30
          ? '19' + fromDateObject.YY
          : '20' + fromDateObject.YY;
    }

    formatedArray.push(value);
  }

  console.log(`formated ${formatedArray.join(toSeperator)}`);

  return formatedArray.join(toSeperator);
}

formatDate('97/02/18', ['YY', 'MM', 'DD', '/'], ['DD', 'MM', 'YYYY', '.']);
module.exports = formatDate;
