'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let yearIndex = 0;
  let monthIndex = 0;
  let dayIndex = 0;
  const oldJoiner = fromFormat[fromFormat.length - 1];
  const newJoiner = toFormat[toFormat.length - 1];
  const resultArray = [];
  const givenArray = date.split(oldJoiner);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
      case 'YY':
        yearIndex = i;
        break;

      case 'MM':
        monthIndex = i;
        break;

      case 'DD':
        dayIndex = i;
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        if (givenArray[yearIndex].length === 2 && givenArray[yearIndex] < 30) {
          givenArray[yearIndex] = '20' + givenArray[yearIndex];
        }

        if (givenArray[yearIndex].length === 2 && givenArray[yearIndex] >= 30) {
          givenArray[yearIndex] = '19' + givenArray[yearIndex];
        }
        resultArray[i] = givenArray[yearIndex];
        break;

      case 'YY':
        resultArray[i] = givenArray[yearIndex].slice(2);
        break;

      case 'MM':
        resultArray[i] = givenArray[monthIndex];
        break;

      case 'DD':
        resultArray[i] = givenArray[dayIndex];
        break;
    }
  }

  return resultArray.join(newJoiner);
}

module.exports = formatDate;
