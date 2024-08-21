'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // делим дату на части
  const dateParts = date.split(fromFormat[3]);
  const newDateObject = {};

  for (let i = 0; i < 3; i++) {
    newDateObject[fromFormat[i]] = dateParts[i];
  }
  // проверка если в fromFormat есть YYYY, а в toFormat — YY,
  // то newDateObject['YY'] будет присвоено последние две цифры

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    newDateObject['YY'] = newDateObject['YYYY'].slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(newDateObject['YY']);

    newDateObject['YYYY'] =
      year < 30 ? '20' + newDateObject['YY'] : '19' + newDateObject['YY'];
  }

  // формирование новой даты
  const newDate = toFormat
    .slice(0, 3)
    .map((part) => newDateObject[part])
    .join(toFormat[3]);

  return newDate;
}

module.exports = formatDate;
