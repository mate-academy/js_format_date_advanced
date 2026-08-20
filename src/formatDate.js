'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitter = fromFormat.at(-1);
  const splittedDate = date.split(splitter);
  const joiner = toFormat.at(-1);

  let day;
  let month;
  let year;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = splittedDate[i];
    }

    if (fromFormat[i] === 'MM') {
      month = splittedDate[i];
    }

    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = splittedDate[i];
    }
  }

  const resultFormat = [...toFormat];

  for (let i = 0; i < toFormat.length; i++) {
    if (resultFormat[i] === 'DD') {
      resultFormat[i] = day;
    }

    if (resultFormat[i] === 'MM') {
      resultFormat[i] = month;
    }

    if (resultFormat[i] === 'YYYY') {
      if (year.length === 2) {
        if (Number(year) < 30) {
          resultFormat[i] = '20' + year;
        } else {
          resultFormat[i] = '19' + year;
        }
      } else {
        resultFormat[i] = year;
      }
    }

    if (resultFormat[i] === 'YY') {
      resultFormat[i] = year.slice(-2);
    }
  }

  const resultDate = resultFormat.slice(0, -1).join(joiner);

  return resultDate;
}

module.exports = formatDate;
