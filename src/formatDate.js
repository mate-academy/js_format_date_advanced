'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let separator = '';
  const resultArr = [];

  for (const char of date) {
    if (isNaN(+char)) {
      separator = char;
      break;
    }
  }

  const arrayFromGiveData = date.split(separator);
  const constructorObj = {};

  arrayFromGiveData.forEach((el, i) => {
    constructorObj[fromFormat[i]] = arrayFromGiveData[i];
  });

  for (const char of toFormat.slice(0, 3)) {
    if (char === 'YY' && constructorObj['YYYY']) {
      const modifiedChar = constructorObj['YYYY'].slice(2);

      resultArr.push(modifiedChar);

      continue;
    }

    if (char === 'YYYY' && constructorObj['YY']) {
      let year = '';

      if (constructorObj['YY'] >= 30) {
        year = `19${constructorObj['YY']}`;
      }

      if (constructorObj['YY'] < 30) {
        year = `20${constructorObj['YY']}`;
      }

      resultArr.push(year);

      continue;
    }
    resultArr.push(constructorObj[char]);
  }

  return resultArr.join(toFormat.at(-1));
}

module.exports = formatDate;
