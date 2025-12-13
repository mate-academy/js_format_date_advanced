'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[3];
  const toSep = toFormat[3];

  const parts = [];
  let current = '';
  let partIndex = 0;
  let i = 0;

  while (i < date.length) {
    let isSep = true;

    for (let k = 0; k < fromSep.length; k++) {
      if (date[i + k] !== fromSep[k]) {
        isSep = false;
        break;
      }
    }

    if (isSep) {
      parts[partIndex] = current;
      partIndex += 1;
      current = '';
      i += fromSep.length;
    } else {
      current += date[i];
      i += 1;
    }
  }

  parts[partIndex] = current;

  let day;
  let month;
  let year4;
  let year2;

  for (let idx = 0; idx < 3; idx++) {
    const token = fromFormat[idx];
    const value = parts[idx];

    if (token === 'DD') {
      day = value;
    } else if (token === 'MM') {
      month = value;
    } else if (token === 'YYYY') {
      year4 = value;
    } else if (token === 'YY') {
      year2 = value;
    }
  }

  if (year2 !== undefined && year2.length === 1) {
    year2 = `0${year2}`;
  }

  if (year4 === undefined && year2 !== undefined) {
    const yy = Number(year2);

    if (yy < 30) {
      year4 = `20${year2}`;
    } else {
      year4 = `19${year2}`;
    }
  }

  if (year2 === undefined && year4 !== undefined) {
    year2 = `${year4[year4.length - 2]}${year4[year4.length - 1]}`;
  }

  let result = '';

  for (let idx = 0; idx < 3; idx++) {
    const token = toFormat[idx];

    if (idx > 0) {
      result += toSep;
    }

    if (token === 'DD') {
      result += day;
    } else if (token === 'MM') {
      result += month;
    } else if (token === 'YYYY') {
      result += year4;
    } else if (token === 'YY') {
      result += year2;
    }
  }

  return result;
}

module.exports = formatDate;
