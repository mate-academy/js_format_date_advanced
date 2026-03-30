'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat.at(-1);
  const newSeparator = toFormat.at(-1);
  const parts = date.split(oldSeparator);

  const dateParts = {
    DD: null,
    MM: null,
    YYYY: null,
  };

  const result = [];

  for (let i = 0; i < 3; i++) {
    const value = parts[i];

    if (fromFormat[i] === 'DD') {
      dateParts.DD = value;
    }

    if (fromFormat[i] === 'MM') {
      dateParts.MM = value;
    }

    if (fromFormat[i] === 'YYYY') {
      dateParts.YYYY = value;
    }

    if (fromFormat[i] === 'YY') {
      const num = Number(value);

      dateParts.YYYY = num < 30 ? `20${value}` : `19${value}`;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'DD') {
      result.push(dateParts.DD);
    }

    if (toFormat[i] === 'MM') {
      result.push(dateParts.MM);
    }

    if (toFormat[i] === 'YYYY') {
      result.push(dateParts.YYYY);
    }

    if (toFormat[i] === 'YY') {
      const num = dateParts.YYYY.split('');

      num.splice(0, 2);

      result.push(num.join(''));
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
