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

// #region functions form making good data
function getFormatType(formatThatWeLookingFor, arrayOfFormats) {
  for (let i = 0; i < arrayOfFormats.length; i++) {
    const format = arrayOfFormats[i];

    if (formatThatWeLookingFor.includes(format)) {
      return format;
    }
  }

  return -1;
}

function getingDateOrder(dateInArrayMode, dateformat, originalYearForm) {
  const yearPosition = dateformat.indexOf(originalYearForm);
  const monthPosition = dateformat.indexOf('MM');
  const dayPosition = dateformat.indexOf('DD');

  return {
    year: dateInArrayMode[yearPosition],
    month: dateInArrayMode[monthPosition],
    day: dateInArrayMode[dayPosition],
  };
}

function yearFormating(formatedYear, originalYearForm, desiredYearFormat) {
  const yearInput = formatedYear;

  switch (true) {
    case originalYearForm === desiredYearFormat:
      return yearInput;

    case desiredYearFormat === 'YY':
      return formatedYear.toString().split('').slice(2, 4).join('');

    case desiredYearFormat === 'YYYY' && formatedYear >= 30:
      return '19' + formatedYear;

    case desiredYearFormat === 'YYYY' && formatedYear < 30:
      return '20' + formatedYear;

    default:
      return formatedYear;
  }
}

// #endregion

function formatDate(date, fromFormat, toFormat) {
  const formatedData = [];
  const originalDateSeparator = fromFormat[3];
  const newDateSeparator = toFormat[3];
  const originalYearForm = getFormatType(fromFormat, ['YY', 'YYYY']);
  const desiredYearFormat = getFormatType(toFormat, ['YY', 'YYYY']);
  const dateInArrayMode = date.split(`${originalDateSeparator}`);
  const dateInObject = getingDateOrder(
    dateInArrayMode,
    fromFormat,
    originalYearForm
  );

  const year = yearFormating(
    dateInObject.year,
    originalYearForm,
    desiredYearFormat
  );

  for (const typeOfDate of toFormat) {
    switch (typeOfDate) {
      case desiredYearFormat:
        formatedData.push(year.toString());
        break;
      case 'DD':
        formatedData.push(dateInObject.day.toString());
        break;
      case 'MM':
        formatedData.push(dateInObject.month.toString());
        break;

      default:
        break;
    }
  }

  return formatedData.join(newDateSeparator);
}

module.exports = formatDate;
