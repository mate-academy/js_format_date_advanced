'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeperator = fromFormat[3];
  const toSeperator = toFormat[3];
  const dateSplit = date.split(fromSeperator);

  const dateObject = {};
  const newDate = [];

  for (let i = 0; i < 3; i++) {
    dateObject[fromFormat[i]] = dateSplit[i];
  }

  // assign appriopriate data to a new date
  for (let i = 0; i < 3; i++) {
    const format = toFormat[i];
    let formatValue = dateObject[format];

    // check if we need to convert year length
    if (!dateObject.hasOwnProperty(format)) {
      const year = dateObject.YY || dateObject.YYYY;

      formatValue = convertYear(year);
    }

    newDate[i] = formatValue;
  }

  return newDate.join(toSeperator);
}

function convertYear(year) {
  let newYear = year;

  if (year.length === 4) {
    // YYYY => YY
    newYear = newYear.charAt(2) + newYear.charAt(3);
  }

  if (year.length === 2) {
    // check is it before 2000 or after
    const thousands = year >= 30 ? 19 : 20;

    //  YY => YYYY
    newYear = thousands + newYear;
  }

  return newYear;
}

module.exports = formatDate;
