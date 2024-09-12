'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const oldDivider = fromFormat[3];
  const newDivider = toFormat[3];
  const oldDate = date.split(oldDivider);
  const oldDateFormat = fromFormat.slice(0, -1);
  const newDateFormat = toFormat.slice(0, -1);
  const oldDateObject = {};
  const newDate = [];

  for (let i = 0; i < oldDate.length; i++) {
    oldDateObject[oldDateFormat[i]] = oldDate[i];
  }

  if (oldDateObject.hasOwnProperty('YY') && newDateFormat.includes('YYYY')) {
    oldDateObject.YYYY = oldDateObject.YY;

    if (+oldDateObject.YY > 22) {
      oldDateObject.YYYY = oldDateObject.YYYY.padStart(4, '19');
    } else {
      oldDateObject.YYYY = oldDateObject.YYYY.padStart(4, '20');
    }

    delete oldDateObject.YY;
  }

  if (oldDateObject.hasOwnProperty('YYYY') && newDateFormat.includes('YY')) {
    oldDateObject.YY = oldDateObject.YYYY;

    oldDateObject.YY = oldDateObject.YY.slice(2);

    delete oldDateObject.YYYY;
  }

  for (const time of newDateFormat) {
    newDate.push(oldDateObject[time]);
  }

  return newDate.join(newDivider);
}

module.exports = formatDate;
