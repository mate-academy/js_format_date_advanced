'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [f1, f2, f3, splites] = fromFormat;
  const [t1, t2, t3, splitesTo] = toFormat;
  const realDate = date.split(splites);
  let year, month, day;
  const resParts = [];

  if (f1 === 'YYYY' || f1 === 'YY') {
    year = realDate[0];
  }

  if (f2 === 'YYYY' || f2 === 'YY') {
    year = realDate[1];
  }

  if (f3 === 'YYYY' || f3 === 'YY') {
    year = realDate[2];
  }

  if (f1 === 'MM') {
    month = realDate[0];
  }

  if (f2 === 'MM') {
    month = realDate[1];
  }

  if (f3 === 'MM') {
    month = realDate[2];
  }

  if (f1 === 'DD') {
    day = realDate[0];
  }

  if (f2 === 'DD') {
    day = realDate[1];
  }

  if (f3 === 'DD') {
    day = realDate[2];
  }

  if (year.length === 4 && toFormat.includes('YY')) {
    year = year.slice(-2);
  }

  if (year.length === 2 && toFormat.includes('YYYY')) {
    if (Number(year) < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  if (t1 === 'YYYY' || t1 === 'YY') {
    resParts.push(year);
  }

  if (t1 === 'MM') {
    resParts.push(month);
  }

  if (t1 === 'DD') {
    resParts.push(day);
  }

  if (t2 === 'YYYY' || t2 === 'YY') {
    resParts.push(year);
  }

  if (t2 === 'MM') {
    resParts.push(month);
  }

  if (t2 === 'DD') {
    resParts.push(day);
  }

  if (t3 === 'YYYY' || t3 === 'YY') {
    resParts.push(year);
  }

  if (t3 === 'MM') {
    resParts.push(month);
  }

  if (t3 === 'DD') {
    resParts.push(day);
  }

  return resParts.join(splitesTo);
}

module.exports = formatDate;
