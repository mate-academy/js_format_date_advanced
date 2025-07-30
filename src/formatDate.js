'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

// Mentor's variant
function formatDate(date, fromFormat, toFormat) {
  const object = {};
  const result = [];
  const splitDate = date.split(fromFormat[fromFormat.length - 1]);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    object[fromFormat[i]] = splitDate[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (object.YY) {
      if (object.YY >= 30) {
        object.YYYY = '19' + object.YY;
      } else {
        object.YYYY = '20' + object.YY;
      }
    }
  }

  if (object.hasOwnProperty('YYYY')) {
    object.YY = object.YYYY.slice(2);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(object[toFormat[i]]);
  }

  return result.join(toFormat[toFormat.length - 1]);
}

// Chat Gpt variant
// function formatDate(date, fromFormat, toFormat) {
//   const fromSep = fromFormat[3];
//   const toSep = toFormat[3];

//   const parts = date.split(fromSep);
//   const dateMap = {};

//   // Сопоставляем значения с fromFormat
//   for (let i = 0; i < 3; i++) {
//     dateMap[fromFormat[i]] = parts[i];
//   }

//   // Собираем результат по toFormat
//   const result = toFormat.slice(0, 3).map((key) => {
//     if (key === 'YY') {
//       const fullYear = dateMap['YYYY'] || dateMap['YY'];

//       return fullYear.slice(-2); // последние 2 цифры
//     }

//     if (key === 'YYYY') {
//       const shortYear = dateMap['YY'] || dateMap['YYYY'];

//       if (shortYear.length === 2) {
//         const num = parseInt(shortYear, 10);

//         return num < 30 ? '20' + shortYear : '19' + shortYear;
//       }

//       return shortYear;
//     }

//     return dateMap[key];
//   });

//   return result.join(toSep);
// }

// My broken code
// function formatDate(date, fromFormat, toFormat) {
//   const objStock = {};
//   const objReplace = {};
//   const result = [];

//   const [, , , stockSymbol] = fromFormat;
//   const [, , , symbolReplace] = toFormat;

//   const arrayDate = date.split(`${stockSymbol}`);

//   for (let i = 0; i < 3; i++) {
//     objStock[fromFormat[i]] = arrayDate[i];
//     objReplace[toFormat[i]];
//   }

//   for (const key in objStock) {
//     if (objStock.hasOwnProperty(key)) {
//       objReplace[key] = objStock[key];
//     }
//   }

//   for (const key of Object.values(objReplace)) {
//     result.push(key);
//   }

//   return result.join(`${symbolReplace}`);
// }

module.exports = formatDate;

// .join(`${symbolReplace}`)
