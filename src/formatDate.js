'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];

  let year;
  let month;
  let day;

  let yToLength;

  let dToIndex;
  let mToIndex;
  let yToIndex;

  const dateFormated = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('Y')) {
      year = date.split(separatorFrom)[i];
    }

    if (fromFormat[i].includes('M')) {
      month = date.split(separatorFrom)[i];
    }

    if (fromFormat[i].includes('D')) {
      day = date.split(separatorFrom)[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i].includes('Y')) {
      yToLength = toFormat[i].length;
      yToIndex = i;
    }

    if (toFormat[i].includes('D')) {
      dToIndex = i;
    }

    if (toFormat[i].includes('M')) {
      mToIndex = i;
    }
  }

  if (year.length > yToLength) {
    year = year.slice(-2);
  }

  if (year.length < yToLength) {
    if (year >= 30) {
      year = `19${year}`;
    }

    if (year === '00') {
      year = `20${year}`;
    }

    if (year < 30) {
      year = `20${year}`;
    }
  }

  dateFormated[yToIndex] = year;
  dateFormated[mToIndex] = month;
  dateFormated[dToIndex] = day;

  return dateFormated.join(`${separatorTo}`);
}

module.exports = formatDate;
