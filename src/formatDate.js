'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  let day = '';
  let month = '';
  let year = '';
  const arrayDate = date.split(oldSeparator);
  let from = '';
  let to = '';
  const res = [];

  const convertYear = (value, fromType, toType) => {
    if (fromType === 'YYYY' && toType === 'YY') {
      return value.slice(-2);
    }

    if (fromType === 'YY' && toType === 'YYYY') {
      const yy = Number(value);

      return (yy < 30 ? '20' : '19') + value;
    }

    return value;
  };

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('D')) {
      day = arrayDate[i];
    }

    if (fromFormat[i].includes('M')) {
      month = arrayDate[i];
    }

    if (fromFormat[i].includes('Y')) {
      from = fromFormat[i];
      year = arrayDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('D')) {
      res[i] = day;
    }

    if (toFormat[i].includes('M')) {
      res[i] = month;
    }

    if (toFormat[i].includes('Y')) {
      to = toFormat[i];
      res[i] = convertYear(year, from, to);
    }
  }

  return res.join(newSeparator);
}

module.exports = formatDate;
