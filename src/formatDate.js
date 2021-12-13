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
  let anwser = '';
  // dateArray is creates an array from the date string,
  // fromFormat[3] is an old separator
  const dateArray = date.split(fromFormat[3]);

  // loop through the new format array
  for (let i = 0; i < toFormat.length - 1; i++) {
    // loop through the old format array
    for (let e = 0; e < fromFormat.length - 1; e++) {
      /*
      I want to convert the date array from the old format to the new format
      and add it to the anwser string, that's why I first loop through
      the toFormat array, take the first letter of the new format,
      then I look for the corresponding letter in the fromFormat array,
      in that way I will know the index of the variable in the dateArray,
      so I can add it to the anwser string.
      If current variable represents year, I also need to check whether
      the format of the year should be changed.
      */
      if (toFormat[i][0] === fromFormat[e][0]) {
        /*
        I might need to convert YY to YYYY or vica versa,
        that's why I check wether the current variable represents year.
        If the length of the year is the same, than I don't change anything.
        Othewise, I need to either shorten or lengthen the year variable in
        the dateArray.
        */
        if (fromFormat[e][0] === 'Y') {
          if (fromFormat[e].length > toFormat[i].length) {
            const shortenedYearStyle = dateArray[e].substring(2);

            dateArray[e] = shortenedYearStyle;
          } else if (fromFormat[e].length < toFormat[e].length) {
            if (dateArray[e] >= 30) {
              const twentyCetury = '19' + dateArray[e];

              dateArray[e] = twentyCetury;
            } else if (dateArray[e] < 30) {
              const twentyFirstCentury = '20' + dateArray[e];

              dateArray[e] = twentyFirstCentury;
            }
          }
        }
        /*
        If there are more than one symbol in the anwser string
        I add the new sepparator.
        */

        if (anwser.length > 0) {
          anwser += toFormat[3];
        }
        // Here I add variables in the new order to the anwser string.
        anwser += dateArray[e];
      }
    }
  }

  return anwser;
}

module.exports = formatDate;
