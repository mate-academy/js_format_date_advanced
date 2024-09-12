'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = date.replace(/\d/gi, '')[0];
  const newSeparator = toFormat[toFormat.length - 1];
  const result = [];

  let oldYear = '';
  let oldDay = '';
  let oldMonth = '';

  const splitDate = date.split(separator);

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i].startsWith('Y')) {
      oldYear = splitDate[i];
    }

    if (fromFormat[i].startsWith('M')) {
      oldMonth = splitDate[i];
    }

    if (fromFormat[i].startsWith('D')) {
      oldDay = splitDate[i];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i].startsWith('Y')) {
      const formatedYear = correct(toFormat[i].length, oldYear.length, oldYear);

      result.push(formatedYear);
    }

    if (toFormat[i].startsWith('M')) {
      result.push(oldMonth);
    }

    if (toFormat[i].startsWith('D')) {
      result.push(oldDay);
    }
  }

  return result.join(newSeparator);
}

function correct(newFormat, oldFormat, date) {
  let formattedYear = date;

  if (date.length < 3) {
    if (date < 30) {
      formattedYear = `20${date}`;
    } else {
      formattedYear = `19${date}`;
    }
  }

  if (newFormat < oldFormat) {
    const index = newFormat - oldFormat;

    return formattedYear.slice(index);
  }

  return formattedYear;
}

module.exports = formatDate;
