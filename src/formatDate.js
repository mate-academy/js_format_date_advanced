'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // take an array e.g.
  // [ '2020', '02', '18' ]
  // Take a format
  // e.g.
  const fromDelimiter = fromFormat[fromFormat.length - 1];
  const splitDate = date.split(fromDelimiter);

  // Create a new object
  // The keys are the specifies 'YYYY' 'DD' 'MM'
  // The values are the corresponding values
  const obj = {};

  for (let i = 0; i <= 2; i++) {
    const key = fromFormat[i];

    obj[key] = splitDate[i];
  }

  // If the toFormat has a year that is 'YY''
  // And the fromFormat has a year that is 'YYYY'
  // Change the fromFormat year to 'YY'
  // First, find the YYYY in the toFormat
  // const toFormatYear = toFormat.includes('YY');
  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    const updatedYear = obj['YYYY'].slice(-2);

    delete obj['YYYY'];
    obj['YY'] = updatedYear;
  }

  // We need to make sure anything >= 30 -> 1900+
  // And everything < 30 to be 2000+
  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = Number(obj['YY']);
    let updatedYear;

    if (year >= 30) {
      updatedYear = '19' + obj['YY'];
    } else if (year < 30) {
      updatedYear = '20' + obj['YY'];
    }

    delete obj['YY'];
    obj['YYYY'] = updatedYear;
  }

  // Now that the year, month, day keys accord with the values
  // Construct a string by accessing the object
  // In the order that the toFormat specifies
  const returnValue = [];
  const toDelimiter = toFormat[toFormat.length - 1];

  for (let i = 0; i <= 2; i++) {
    const key = toFormat[i];

    returnValue.push(obj[key]);
  }

  return returnValue.join(toDelimiter);
}

module.exports = formatDate;
