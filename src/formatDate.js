'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
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
 *   '97/02/18',
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

function formatDate(date, fromFormat, toFormat) {
  const fromFormatSeparator = fromFormat[3]; // разделитель в fromFormat
  const toFormatSeparator = toFormat[3]; // разделитель в toFormat
  const dateArr = date.split(fromFormatSeparator); // массив из чисел даты
  let year = '';
  const res = [...toFormat];

  res.pop();

  // позиционирование промежутков времени в fromFormat
  let yearFromPosition = '';
  let monthFromPosition = '';
  let dayFromPosition = '';

  // позиционирование промежутков времени в toFormat
  let yearToPosition = '';
  let monthToPosition = '';
  let dayToPosition = '';

  // определение позиций в fromFormat
  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('Y')) {
      yearFromPosition = i;
    }

    if (fromFormat[i].includes('M')) {
      monthFromPosition = i;
    }

    if (fromFormat[i].includes('D')) {
      dayFromPosition = i;
    }
  }

  // определение позиций в toFormat
  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('Y')) {
      yearToPosition = i;
    }

    if (toFormat[i].includes('M')) {
      monthToPosition = i;
    }

    if (toFormat[i].includes('D')) {
      dayToPosition = i;
    }
  }

  // определение того, как будет отображаться год
  const yearToFormat = toFormat[yearToPosition].length;
  const yearFromFormat = fromFormat[yearFromPosition].length;

  if (yearToFormat === 4) {
    if (yearFromFormat === 4) {
      year = dateArr[yearFromPosition];
    } else {
      if (dateArr[yearFromPosition] < 30) {
        year = `20${dateArr[yearFromPosition]}`;
      } else {
        year = `19${dateArr[yearFromPosition]}`;
      }
    }
  } else {
    year = `${dateArr[yearFromPosition][2]}${dateArr[yearFromPosition][3]}`;
  }

  res[yearToPosition] = year;
  res[monthToPosition] = dateArr[monthFromPosition];
  res[dayToPosition] = dateArr[dayFromPosition];

  return res.join(toFormatSeparator);
}

module.exports = formatDate;
