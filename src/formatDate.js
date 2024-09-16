'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const partsOfDays = {
    day: '',
    month: '',
    year: '',
  };

  let { day, month, year } = partsOfDays;

  const separator = toFormat[toFormat.length - 1];

  const dateParts = date.split(fromFormat[fromFormat.length - 1]);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      day += dateParts[i];
    }

    if (fromFormat[i] === 'MM') {
      month += dateParts[i];
    }

    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year += dateParts[i];
    }
  }

  const newFormat = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      newFormat.push(day);
    }

    if (toFormat[i] === 'MM') {
      newFormat.push(month);
    }

    if (toFormat[i] === 'YY') {
      newFormat.push(year.slice(2));
    }

    if (toFormat[i] === 'YYYY' && fromFormat.includes('YYYY')) {
      newFormat.push(year);
    }

    if (toFormat[i] === 'YYYY' && fromFormat[i] === 'YY' && year < 30) {
      newFormat.push(`20${year}`);
    }

    if (toFormat[i] === 'YYYY' && fromFormat[i] === 'YY' && year >= 30) {
      newFormat.push(`19${year}`);
    }
  }

  return newFormat.join(separator);
}

module.exports = formatDate;
