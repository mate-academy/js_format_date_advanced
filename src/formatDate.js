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
  const bigYear = 20;
  const smallYear = 19;
  const turningPoint = 30;

  const type = fromFormat[3];
  const [newFirstType, newSecondType, newThirdType, newType] = toFormat;
  const types = [newFirstType, newSecondType, newThirdType];

  const numbers = date.split(`${type}`);

  const newNumbers = [];

  const indexOfDay = fromFormat.indexOf('DD');
  const indexOfMonth = fromFormat.indexOf('MM');
  let indexOfYear = fromFormat.indexOf('YY');
  let typeYear = 'YY';

  let newTypeYear = 'YY';

  if (fromFormat.includes('YYYY')) {
    indexOfYear = fromFormat.indexOf('YYYY');
    typeYear = 'YYYY';
  }

  if (toFormat.includes('YYYY')) {
    newTypeYear = 'YYYY';
  }

  for (let i = 0; i < types.length; i++) {
    if (types[i] === 'DD') {
      newNumbers.push(numbers[indexOfDay]);
    }

    if (types[i] === 'MM') {
      newNumbers.push(numbers[indexOfMonth]);
    }

    if (types[i] === newTypeYear) {
      if (typeYear === newTypeYear) {
        newNumbers.push(numbers[indexOfYear]);
      }

      if (typeYear !== newTypeYear && typeYear.length > newTypeYear.length) {
        const result = numbers[indexOfYear].split('').slice(2).join('');

        newNumbers.push(result);
      }

      if (
        typeYear !== newTypeYear &&
        typeYear.length < newTypeYear.length &&
        numbers[indexOfYear] < turningPoint
      ) {
        const result = `${bigYear}${numbers[indexOfYear]}`;

        newNumbers.push(result);
      }

      if (
        typeYear !== newTypeYear &&
        typeYear.length < newTypeYear.length &&
        numbers[indexOfYear] >= turningPoint
      ) {
        newNumbers.push(`${smallYear}${numbers[indexOfYear]}`);
      }
    }
  }

  return newNumbers.join(`${newType}`);
}

module.exports = formatDate;
