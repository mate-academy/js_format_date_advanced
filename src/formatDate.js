'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = toFormat[toFormat.length - 1];
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);
  const objFrom = {};
  const objTo = {};

  dateArray.forEach((element, index) => {
    objFrom[fromFormat[index][0]] = element;
  });

  toFormat.slice(0, 3).forEach((element, index) => {
    objTo[toFormat[index]] = '';
  });

  const objFromArr = Object.keys(objFrom);
  const objToArr = Object.keys(objTo);

  for (let i = 0; i < objFromArr.length; i++) {
    for (let j = 0; j < objToArr.length; j++) {
      if (objToArr[j][0] === objFromArr[i][0]) {
        const fromPart = fromFormat[i];
        const toPart = toFormat[j];
        const year = objFrom[fromPart[0]];

        if (fromPart === 'YYYY' && toPart === 'YY') {
          objTo[toPart] = year.slice(-2);
        } else if (fromPart === 'YY' && toPart === 'YYYY') {
          objTo[toPart] = Number(year) < 30 ? `20${year}` : `19${year}`;
        } else {
          objTo[toPart] = objFrom[fromPart[0]];
        }

        break;
      }
    }
  }

  function getDate(obj) {
    const result = [];

    for (const key in obj) {
      result.push(obj[key]);
    }

    return result.join(separator);
  }

  return getDate(objTo);
}

module.exports = formatDate;
