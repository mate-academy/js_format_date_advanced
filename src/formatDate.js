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
  const input = date.split(fromFormat[3]); /* get input date array */
  const inputData = {};
  const outputArray = [];

  // get object with input data params

  for (let i = 0; i < 3; i++) {
    inputData[`${fromFormat[i]}`] = input[i];
  }

  // function return string - year corect extend

  function year(objectInput, arrInput, arrOutput) {
    const fromYear = arrInput.concat().sort()[3]; /* get input year extend */
    const toYear = arrOutput.concat().sort()[3]; /* get output year extend */
    const inputYear = objectInput[`${fromYear}`]; /* get input year */
    const yearInteger = Number(inputYear); /* get input year integer */

    // year transformation
    if (fromYear === toYear) { /* YY = YY || YYYY = YYYY */
      return inputYear;
    } else if (fromYear.length > toYear.length) { /* YYYY to YY */
      return inputYear.slice(2);
    } else if (yearInteger < 30) { /* YY to YYYY */
      return '20' + inputYear;
    }

    return '19' + inputYear;
  }

  // create output string

  for (const key of toFormat) {
    switch (key) {
      case 'MM':
        outputArray.push(inputData.MM);
        break;
      case 'DD':
        outputArray.push(inputData.DD);
        break;
      case 'YY':
        outputArray.push(year(inputData, fromFormat, toFormat));
        break;
      case 'YYYY':
        outputArray.push(year(inputData, fromFormat, toFormat));
        break;
      default:
        return outputArray.join(toFormat[3]);
    }
  }
}

module.exports = formatDate;
