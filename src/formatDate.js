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
  const dateArr = date.split(`${fromFormat.at(-1)}`);

  const indexDay = fromFormat.indexOf('DD');
  const indexMonth = fromFormat.indexOf('MM');
  let indexYear = 0;

  if (fromFormat.indexOf('YYYY') !== -1) {
    indexYear = fromFormat.indexOf('YYYY');
  } else {
    indexYear = fromFormat.indexOf('YY');
  }

  const day = dateArr[indexDay];
  const month = dateArr[indexMonth];
  let year = dateArr[indexYear];

  if (toFormat.includes('YYYY')) {
    if (+year >= 30 && year.length < 4) {
      year = `19${year}`;
    } else if (year.length < 4) {
      year = `20${year}`;
    }
  }

  if (toFormat.includes('YY')) {
    year = year.slice(-2);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
      case 'YY':
        result.push(year);
        break;
      case 'DD':
        result.push(day);
        break;
      case 'MM':
        result.push(month);
        break;
      default:
        break;
    }
  }

  return result.join(`${toFormat.at(-1)}`);
}

module.exports = formatDate;
