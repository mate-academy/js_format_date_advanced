'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // витягаю у змінні разділітелі(сепаратори)
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];

  // створюю массив з прийшедшої дати
  const dateArr = date.split(separatorFrom);

  // створюю обїект в якому будут знаходитись ключ=значення ('DD':12);
  const oldFormatObj = {};
  let countYString = 'YYYY';
  const result = [];

  for (let i = 0; i < dateArr.length; i++) {
    oldFormatObj[fromFormat[i]] = dateArr[i];
  }

  if (oldFormatObj['YY']) {
    countYString = 'YY';
  }

  for (let i = 0; i < dateArr.length; i++) {
    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      result.push(changeFormatYear(
        countYString,
        toFormat[i],
        oldFormatObj[countYString]
      ));
    } else {
      result.push(oldFormatObj[toFormat[i]]);
    }
  }

  // changeFormatYear(startFormat, endFormat, year)
  // - функція яка повертає рік з указаних умов
  // startFormat - (string) начальний формат року (YY або YYYY)
  // endFormat - (string) це кінечний формат року
  // year - (number) - рік (2020)
  function changeFormatYear(startFormat, endFormat, year) {
    if (startFormat.length === endFormat.length) {
      return year;
    }

    if (startFormat.length > endFormat.length) {
      return [...String(year)].splice(2, 2).join('');
    }

    if (startFormat.length < endFormat.length) {
      if (year === '00' || year < 30) {
        return `20${year}`;
      }

      if (year > 30 || year === '30') {
        return `19${year}`;
      }
    }
  }

  return result.join(separatorTo);
}

module.exports = formatDate;
