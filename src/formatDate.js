'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const joinElementOld = fromFormat[fromFormat.length - 1];
  const joinElementNew = toFormat[toFormat.length - 1];

  const dateArray = date.split(joinElementOld);

  fromFormat.pop();

  const newDate = [];

  for (const element of fromFormat) {
    let oldIndex = fromFormat.indexOf(element);
    let newIndex = toFormat.indexOf(element);

    if (newIndex === -1) {
      if (toFormat.includes('YYYY')) {
        newIndex = toFormat.indexOf('YYYY');
        oldIndex = fromFormat.indexOf('YY');

        newDate[newIndex] = '20' + dateArray[oldIndex];

        if (dateArray[oldIndex] >= '30') {
          newDate[newIndex] = '19' + dateArray[oldIndex];
        }

        if (dateArray[oldIndex] < '30') {
          newDate[newIndex] = '20' + dateArray[oldIndex];
        }
      }

      if (toFormat.includes('YY')) {
        newIndex = toFormat.indexOf('YY');
        oldIndex = fromFormat.indexOf('YYYY');
        newDate[newIndex] = dateArray[oldIndex].slice(2);
      }
    } else {
      newDate[newIndex] = dateArray[oldIndex];
    }
  }

  return newDate.join(joinElementNew);
}

module.exports = formatDate;
