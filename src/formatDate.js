'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorOld = fromFormat[fromFormat.length - 1];
  const separatorNew = toFormat[toFormat.length - 1];
  const datePart = date.split(separatorOld);
  const lengthDate = datePart.length - 1;

  const newFormat = [];

  // const separator = 3;
  // const maxLength = 3;
  // const dateParts = date.split(fromFormat[separator]);
  // const newDate = [];

  for (let i = 0; i <= lengthDate; i++) {
    if (fromFormat[i] === 'YYYY' && toFormat.includes('YY')) {
      const indexYear = toFormat.indexOf('YY');
      const newYear = datePart[indexYear].split('').slice(2).join('');

      newFormat.push(newYear);

      break;
    }

    if (fromFormat[i] === 'YY' && toFormat.includes('YYYY')) {
      const indexYear = toFormat.indexOf('YYYY');
      const year = datePart[indexYear];
      const newYear = year < 30 ? `20${year}` : `19${year}`;

      newFormat.push(newYear);

      continue;
    }

    const indexOfDate = fromFormat.indexOf(toFormat[i]);

    newFormat.push(datePart[indexOfDate]);
  }

  return newFormat.join(separatorNew, lengthDate);
}

module.exports = formatDate;
