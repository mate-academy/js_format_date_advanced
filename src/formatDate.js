'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitDate = date.split(fromFormat[3]);

  const year =
    splitDate[
      fromFormat.findIndex((element) => element === 'YYYY' || element === 'YY')
    ];

  const month = splitDate[fromFormat.findIndex((element) => element === 'MM')];
  const day = splitDate[fromFormat.findIndex((element) => element === 'DD')];

  let convertedYear = year;

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    convertedYear = convertedYear.slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const yearNumber = Number(convertedYear);

    if (yearNumber < 30) {
      convertedYear = `20${convertedYear}`;
    } else {
      convertedYear = `19${convertedYear}`;
    }
  }

  const result = [];

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      result.push(convertedYear);
    }

    if (toFormat[i] === 'MM') {
      result.push(month);
    }

    if (toFormat[i] === 'DD') {
      result.push(day);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
