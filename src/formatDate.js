'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparate = fromFormat[fromFormat.length - 1];
  // console.log(oldSeparate)
  const newSeparate = toFormat[toFormat.length - 1];
  // console.log(newSeparate)

  const dataToday = date.split(oldSeparate);
  let year;
  let mans;
  let day;

  for (let i = 0; i < dataToday.length; i++) {
    if (fromFormat[i].includes('Y')) {
      year = dataToday[i];
    } else if (fromFormat[i].includes('M')) {
      mans = dataToday[i];
    } else if (fromFormat[i].includes('D')) {
      day = dataToday[i];
    }
  }

  const resultParts = [];

  for (let z = 0; z < toFormat.length; z++) {
    if (toFormat[z].includes('Y') && toFormat[z].length === year.length) {
      resultParts[z] = year;
    } else if (toFormat[z].includes('Y') && toFormat[z].length < year.length) {
      resultParts[z] = year.slice(-2);
    } else if (
      toFormat[z].includes('Y') &&
      toFormat[z].length > year.length &&
      parseInt(year, 10) < 30
    ) {
      resultParts[z] = '20' + year;
    } else if (
      toFormat[z].includes('Y') &&
      toFormat[z].length > year.length &&
      parseInt(year, 10) >= 30
    ) {
      resultParts[z] = '19' + year;
    } else if (toFormat[z].includes('M')) {
      resultParts[z] = mans;
    } else if (toFormat[z].includes('D')) {
      resultParts[z] = day;
    }
  }

  return resultParts.join(newSeparate);
}

module.exports = formatDate;
