'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const splitedArr = date.split(separator);

  const dateObj = {};

  splitedArr.forEach((el, index) => {
    dateObj[fromFormat[index]] = el;
  });

  const transformedDate = {};

  const year = dateObj['YY'] || dateObj['YYYY'];
  const targetYearFormat = toFormat.includes('YY') ? 'YY' : 'YYYY';

  let transformedYear;

  if (year.length === 4 && targetYearFormat === 'YY') {
    transformedYear = year.substring(2);
  } else if (year.length === 2 && targetYearFormat === 'YYYY') {
    const twoDigitYear = Number(year);

    transformedYear = (twoDigitYear < 30 ? '20' : '19') + year;
  } else {
    transformedYear = year;
  }

  transformedDate['MM'] = dateObj['MM'];
  transformedDate['DD'] = dateObj['DD'];
  transformedDate[targetYearFormat] = transformedYear;

  const resDate = [];

  for (let i = 0; i < 3; i++) {
    resDate[i] = transformedDate[toFormat[i]];
  }

  return resDate.join(toFormat[3]);
}

module.exports = formatDate;
