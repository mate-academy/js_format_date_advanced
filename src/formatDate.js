'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  const objDate = {};

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i][0]) {
      case `D`:
        objDate.day = dateArr[i];
        break;

      case `M`:
        objDate.month = dateArr[i];
        break;

      case `Y`:
        objDate.year = dateArr[i];
        break;
    }
  }

  const formatedArr = [];

  for (const value of toFormat) {
    switch (value[0]) {
      case `D`:
        formatedArr.push(objDate.day);
        break;

      case `M`:
        formatedArr.push(objDate.month);
        break;

      case `Y`:
        if (fromFormat.includes(`YYYY`) && toFormat.includes(`YY`)) {
          objDate.year = objDate.year.substr(2);
        }

        if (fromFormat.includes(`YY`) && toFormat.includes(`YYYY`)
         && +objDate.year < 30) {
          objDate.year = `20${objDate.year}`;
        } else if (fromFormat.includes(`YY`) && toFormat.includes(`YYYY`)
         && +objDate.year >= 30) {
          objDate.year = `19${objDate.year}`;
        }
        formatedArr.push(objDate.year);
        break;
    }
  }

  const formatedDate = formatedArr.join(toFormat[toFormat.length - 1]);

  return formatedDate;
}

module.exports = formatDate;
