'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // разбил дату на части
  const separator = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(separator);
  //  создаю обьект и передаю хгачения и ключи
  const dateMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  // подготовка новой даты и сепаратора
  const fields = toFormat.slice(0, 3);
  const toSeparator = toFormat[toFormat.length - 1];

  // собираем новую дату

  const result = [];

  for (const el of fields) {
    if (el === 'YY' && dateMap['YYYY']) {
      result.push(dateMap['YYYY'].slice(-2));
    } else if (el === 'YYYY' && dateMap['YY']) {
      const yy = Number(dateMap['YY']);

      if (yy < 30) {
        result.push('20' + dateMap['YY']);
      } else {
        result.push('19' + dateMap['YY']);
      }
    } else {
      result.push(dateMap[el]);
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
