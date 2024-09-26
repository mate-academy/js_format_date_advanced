'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = [];
  const oldDate = date.split(fromFormat[fromFormat.length - 1]);

  function findSameElement(index) {
    for (const oldElement of fromFormat) {
      const indexOfOld = fromFormat.indexOf(oldElement);
      let newElement = oldDate[indexOfOld];

      if (oldElement === toFormat[index]) {
        newDate.push(newElement);
        break;
      }

      const isBothYears = oldElement.includes('Y')
      && toFormat[index].includes('Y');
      const isNewLengthBigger = oldElement.length < toFormat[index].length;

      if (isBothYears && !isNewLengthBigger) {
        newElement = oldDate[indexOfOld].slice(2);
        newDate.push(newElement);
      }

      if (isBothYears && isNewLengthBigger && (+oldDate[indexOfOld] < 30)) {
        newElement = 20 + oldDate[indexOfOld];
        newDate.push(newElement);
      } else if (isBothYears && isNewLengthBigger) {
        newElement = 19 + oldDate[indexOfOld];
        newDate.push(newElement);
      }
    }
  }

  findSameElement(0);
  findSameElement(1);
  findSameElement(2);

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
