'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeperator = fromFormat[fromFormat.length - 1];
  const newSeperator = toFormat[toFormat.length - 1];
  let twoDigitYear = '';
  const inputDate = date.split(oldSeperator);
  const newDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY' && toFormat[i] === 'YY') {
      inputDate[i] = inputDate[i].slice(-2);
    }
  }

  if (
    fromFormat[0].length === toFormat[0].length &&
    fromFormat[0] === toFormat[0]
  ) {
    return inputDate.join(newSeperator);
  }

  if (fromFormat[0].length === 2 && Number(inputDate[0]) >= 30) {
    twoDigitYear += '19' + inputDate[0];
    inputDate[0] = twoDigitYear;

    return inputDate.join(newSeperator);
  }

  if (fromFormat[0].length === 2 && +inputDate[0] < 30) {
    twoDigitYear += '20' + inputDate[0];
    inputDate[0] = twoDigitYear;

    return inputDate.join(newSeperator);
  }

  if (fromFormat[1] === 'YYYY') {
    const specificDate = {
      day: '',
      month: '',
      year: '',
    };

    for (let i = inputDate.length - 1; i >= 0; i--) {
      for (const key of Object.keys(specificDate)) {
        specificDate[key] = inputDate[i];
      }
    }

    const nonStandardDate = Object.values(specificDate);

    return nonStandardDate.join(newSeperator);
  }

  for (let i = inputDate.length - 1; i >= 0; i--) {
    newDate.push(inputDate[i]);
  }

  return newDate.join(newSeperator);
}

module.exports = formatDate;
