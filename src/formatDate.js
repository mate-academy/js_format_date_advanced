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

  const oldSeperator = fromFormat.pop();
  const dateArray = date.split(oldSeperator);
  const newSeperator = toFormat.pop();

  let year, month, day;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('Y')) {
      year = dateArray[i];
    }

    if (fromFormat[i].includes('M')) {
      month = dateArray[i];
    }

    if (fromFormat[i].includes('D')) {
      day = dateArray[i];
    }
  }

  for (let i = 0; i < dateArray.length; i++) {
    if (toFormat[i].includes('Y')) {
      if (toFormat[i].length === 4) {
        if (+year.slice(-2) < 30) {
          result[i] = `20${year.slice(-2)}`;
        } else {
          result[i] = `19${year.slice(-2)}`;
        }
      } else {
        result[i] = year.slice(-2);
      }
    }

    if (toFormat[i].includes('M')) {
      result[i] = month;
    }

    if (toFormat[i].includes('D')) {
      result[i] = day;
    }
  }

  return result.join(newSeperator);
}

module.exports = formatDate;
