'use strict';

//  * @param {string} date
//  * @param {string[]} fromFormat
//  * @param {string[]} toFormat
//  *
//  * @returns {string}

function formatDate(date, fromFormat, toFormat) {
  let dateArray = [];
  let newArray = [];

  // Знаходимо роздільник і розбиваємо дату
  for (let i = 0; i < date.length; i++) {
    if (isNaN(Number(date[i]))) {
      dateArray = date.split(date[i]);
      break;
    }
  }

  for (let el = 0; el < 3; el++) {
    if (fromFormat[el] === 'YYYY' || fromFormat[el] === 'YY') {
      for (let i = 0; i < 3; i++) {
        if (toFormat[i] === 'YY' && fromFormat[el] === 'YYYY') {
          newArray[i] = dateArray[el].slice(2);
        } else if (toFormat[i] === 'YYYY' && fromFormat[el] === 'YY') {
          if (Number(dateArray[el]) < 30) {
            newArray[i] = '20' + dateArray[el];
          } else {
            newArray[i] = '19' + dateArray[el];
          }
        } else if (toFormat[i] === fromFormat[el]) {
          newArray[i] = dateArray[el];
        }
      }
    } else if (fromFormat[el] === 'MM') {
      for (let i = 0; i < 3; i++) {
        if (toFormat[i] === 'MM') {
          newArray[i] = dateArray[el];
        }
      }
    } else if (fromFormat[el] === 'DD') {
      for (let i = 0; i < 3; i++) {
        if (toFormat[i] === 'DD') {
          newArray[i] = dateArray[el];
        }
      }
    }
  }

  newArray = newArray.join(toFormat[3]);

  return newArray;
}

module.exports = formatDate;
