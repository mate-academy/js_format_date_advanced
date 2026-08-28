'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObject = createDateObject(date, fromFormat);

  const newDateArray = [
    dateObject[toFormat[0]],
    dateObject[toFormat[1]],
    dateObject[toFormat[2]],
  ];

  return newDateArray.join(toFormat[3]);
}

function createDateObject(date, fromFormat) {
  const dateParts = date.split(fromFormat[3]);
  const dateObject = {};

  for (let i = 0; i < 3; i++) {
    dateObject[fromFormat[i]] = dateParts[i];
  }

  if ('YYYY' in dateObject) {
    dateObject['YY'] = dateObject.YYYY % 100;
  } else {
    dateObject['YYYY'] =
      dateObject.YY < 30 ? '20' + dateObject.YY : '19' + dateObject.YY;
  }

  return dateObject;
}

module.exports = formatDate;
createDateObject('31-02-18', ['YY', 'MM', 'DD', '-']);
