'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 *`  year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '[97, 02, 18]',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

// function formatDate(date, fromFormat, toFormat) {
//   // дублікат масиву fromFormat
//   const copyFromFormat = [...fromFormat];
//   // видалений останій елемент масиву copyFromFormat
//   const oldJointChar = copyFromFormat.pop();
//   // масив date у вигляді цифрового значення - [97, 02, 18]
//   const arrayDate = date.split(oldJointChar);
//   // тут я хочу поєднати два масиви copyFromFormat = (ключ),
//   // and arrayDate = (значення)
//   const objFromFormat = {};

//   // цикл (for) для створення obj
//   for (let i = 0; i < copyFromFormat.length; i++) {
//     objFromFormat[copyFromFormat[i]] = arrayDate[i];
//   }

//   // дублікат масиву toFormat
//   const copyToFormat = [...toFormat];
//   // видалений останій елемент масиву copyToFormat
//   const newJoinChar = copyToFormat.pop();
//   // тут створена зміна для майбутнього результату моєї функції
//   const result = [];
//   // збережений формат року fromFormat
//   let copyFromFormatYear;
//   // збережений формат року toFormat
//   let copyToFormatYear;
//   let yearIndex;

//   // функція яка повертає правильний формат року
//   function theRightYearFormat(oldFormat, newFormat) {
//     let outcome = arrayDate[yearIndex];

//     if (oldFormat.length === newFormat.length) {
//       return outcome;
//     }

//     if (oldFormat.length < newFormat.length) {
//       outcome = outcome < 30 ? '20' + outcome : '19' + outcome;

//       return outcome;
//     }

//     if (oldFormat.length > newFormat.length) {
//       return outcome.slice(2);
//     }
//   }

//   const fourSignificant = 'YYYY';
//   const twoSignificant = 'YY';

//   for (let i = 0; i < copyFromFormat.length; i++) {
//     if (copyFromFormat[i] === twoSignificant) {
//       copyFromFormatYear = twoSignificant;
//       yearIndex = i;
//     }

//     if (copyFromFormat[i] === fourSignificant) {
//       copyFromFormatYear = fourSignificant;
//       yearIndex = i;
//     }

//     if (copyToFormat[i] === twoSignificant) {
//       copyToFormatYear = twoSignificant;
//     }

//     if (copyToFormat[i] === fourSignificant) {
//       copyToFormatYear = fourSignificant;
//     }
//   }

//   for (let i = 0; i < copyToFormat.length; i++) {
//     if (copyFromFormat[i] === fourSignificant
//       || copyFromFormat[i] === twoSignificant) {
//       result.push(theRightYearFormat(copyFromFormatYear, copyToFormatYear));
//     }
//     result.push(objFromFormat[copyFromFormat[i]]);
//   }

//   return result.join(newJoinChar);
// }

function formatDate(date, fromFormat, toFormat) {
  // date - 1932.19.12
  // [YYYY, DD, MM, '.']
  // [DD, YY, MM, '/']
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();
  const dateArray = date.split(fromSeparator);
  const year = dateArray[fromFormat.indexOf('YY')]
  || dateArray[fromFormat.indexOf('YYYY')];
  const fromYear = fromFormat.find((str) => str.includes('Y'));
  // Find знаходить елемент масиву
  const toYear = toFormat.find((str) => str.includes('Y'));
  const obj = {
    DD: dateArray[fromFormat.indexOf('DD')], // 19
    MM: dateArray[fromFormat.indexOf('MM')], // 12
    YY: getYearRight(fromYear, toYear, year), // 19
    YYYY: getYearRight(fromYear, toYear, year), // 1932
  };

  return toFormat.map((str) => obj[str]).join(toSeparator);
}
// fromYear toYear === YY || YYYY

function getYearRight(fromYear, toYear, correctNumber) {
  const strTransformation = fromYear + '->' + toYear;

  switch (strTransformation) {
    case 'YYYY->YYYY':
    case 'YY->YY':
      return correctNumber;
    case 'YYYY->YY':
      return correctNumber.slice(2);
    case 'YY->YYYY':
      return correctNumber >= 30 ? '19' + correctNumber : '20' + correctNumber;
  }
}
module.exports = formatDate;
