"use strict";

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
 */



function formatDate(date, fromFormat, toFormat) {
  const separator1 = fromFormat[fromFormat.length - 1]; // creating variavble with date separotor
  const dateElements = date.split(separator1); // creating araay with date element in good order

  const matcher = {};

  for (let index = 0; index < dateElements.length; index++) {
    matcher[fromFormat[index]] = dateElements[index]; // creating object with connected date elements names and varaibles
  }

  let { YYYY, MM, DD, YY } = matcher; // creating variables from date object

  if (YYYY === undefined) {
    if (YY > 24) {
      YYYY = Number("19" + String(YY)); // trying to do YYYY from YY
    } else {
      YYYY = Number("20" + String(YY));
    }
  }

  if (YY === undefined) {
    YY = YYYY.slice(2);
  }

  const newDateElements = []; // creating new array for new dare elelmnts

  const separator2 = toFormat[toFormat.length - 1]; //variable of new seperator

  for (let index = 0; index < toFormat.length - 1; index++) { //pushing to new array
    if (toFormat[index] === "YYYY") {
      newDateElements.push(YYYY);
    }

    if (toFormat[index] === "YY") {
      newDateElements.push(YY);
    }

    if (toFormat[index] === "MM") {
      newDateElements.push(MM);
    }

    if (toFormat[index] === "DD") {
      newDateElements.push(DD);
    }
  }

  const result = newDateElements.join(separator2);

  return result;
}

module.exports = formatDate;
