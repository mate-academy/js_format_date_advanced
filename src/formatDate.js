'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */



function formatDate(date, fromFormat, toFormat) {
  let fourDigitsFrom = false;
  let fourDigitsTo = false;
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];
  const newDate = [];

 const text = date.split(separatorFrom);

  let indexFromYear = fromFormat.indexOf('YY');
  const indexFromMonth = fromFormat.indexOf('MM');
  const indexFromDay = fromFormat.indexOf('DD');


  const day = text[indexFromDay];
  const month = text[indexFromMonth];
  let year = text[indexFromYear];
  if (indexFromYear === -1) {
    indexFromYear = fromFormat.indexOf('YYYY');
    year = text[indexFromYear];
    fourDigitsFrom = true;
  }

  let indexToYear = toFormat.indexOf('YY');
  const indexToMonth = toFormat.indexOf('MM');
  const indexToDay = toFormat.indexOf('DD');
  if (indexToYear === -1) {
    indexToYear = toFormat.indexOf('YYYY');
    fourDigitsTo = true;
  }

  if (fourDigitsFrom) {
    if ( !fourDigitsTo) {
      year = year.slice(2);
    }
  } else if (fourDigitsTo){
      if (parseInt(year) < 30) {
        year = '20' + year;
      } else {
        year = '19' + year;
      }
  }

  newDate[indexToDay] = day;
  newDate[indexToMonth] = month;
  newDate[indexToYear] = year;

  return newDate.join(separatorTo);


};


module.exports = formatDate;
