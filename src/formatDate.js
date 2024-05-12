'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let result = [];
  const fourYears = 'YYYY';
  const twoYears = 'YY';
  const days = 'DD';
  const months = 'MM';
  const partsDate = date.split(fromFormat[fromFormat.length - 1]);

  const info = {};

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case twoYears:
      case fourYears:
        info.year = partsDate[i];
        break;
      case months:
        info.month = partsDate[i];
        break;
      case days:
        info.day = partsDate[i];
        break;
    }
  }

  let currentYear;

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === fourYears && info.year.length === 4) {
      result.push(info.year);
    } else if (toFormat[i] === fourYears && info.year.length === 2) {
      if (info.year < 30) {
        currentYear = 20;
      } else {
        currentYear = 19;
      }

      result.push(currentYear + info.year);
    } else if (toFormat[i] === days) {
      result.push(info.day);
    } else if (toFormat[i] === months) {
      result.push(info.month);
    } else if (toFormat[i] === twoYears) {
      result.push(info.year.slice(-2));
    }

    if (i < toFormat.length - 1) {
      result.push(toFormat[toFormat.length - 1]);
    }
  }

  result = result.join('');

  if (result[-1] === result[-2]) {
    result = result.slice(0, -1);
  }

  return result;
}

module.exports = formatDate;
