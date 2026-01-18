'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSep = fromFormat[fromFormat.length - 1];
  const newSep = toFormat[toFormat.length - 1];
  const dateValues = date.split(oldSep);

  // get object with properties we need
  const parts = {};

  for (let i = 0; i < fromFormat.length; i++) {
    const key = fromFormat[i];

    if (key === 'DD') {
      parts[key] = dateValues[i];
    }

    if (key === 'MM') {
      parts[key] = dateValues[i];
    }

    if (key === 'YY' || key === 'YYYY') {
      parts[key] = dateValues[i];
    }
  }

  // find the target year format is
  let year = parts['YY'] || parts['YYYY'];
  let targetYearFormat;

  for (let i = 0; i < toFormat.length - 1; i++) {
    const key = toFormat[i];

    if (key === 'YY' || key === 'YYYY') {
      targetYearFormat = key;
    }
  }

  // format year according to targetYearFormat
  if (targetYearFormat === 'YY' && year.length === 4) {
    year = year.slice(-2);
  } else if (targetYearFormat === 'YYYY' && year.length === 2) {
    year = (+year < 30 ? '20' : '19') + year;
  }

  const formatedDate = [];

  // construct date format based on toFormat order
  for (let i = 0; i < toFormat.length - 1; i++) {
    const key = toFormat[i];

    if (key === 'DD') {
      formatedDate.push(parts['DD']);
    }

    if (key === 'MM') {
      formatedDate.push(parts['MM']);
    }

    if (key === 'YY' || key === 'YYYY') {
      formatedDate.push(year);
    }
  }

  return formatedDate.join(newSep);
}

module.exports = formatDate;
