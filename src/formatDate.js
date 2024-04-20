'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  function convYear(toFormYear, year) {
    if (toFormYear === 'YY') {
      return year.slice(-2);
    } else {
      if (+year < 30) {
        return 20 + year;
      } else {
        return 19 + year;
      }
    }
  }

  // Split date into Arr
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);

  // Create date object with key from fromFormat and values from date array
  const dateObj = {};

  for (let i = 0; i < dateArr.length; i++) {
    dateObj[fromFormat[i]] = dateArr[i];
  }

  // convert YY to YYYY if needed
  if (toFormat.includes('YYYY')) {
    if (!fromFormat.includes('YYYY')) {
      dateObj['convYear'] = convYear('YYYY', dateObj['YY']);
    } else {
      dateObj['convYear'] = dateObj['YYYY'];
    }
  } else {
    if (!fromFormat.includes('YY')) {
      dateObj['convYear'] = convYear('YY', dateObj['YYYY']);
    } else {
      dateObj['convYear'] = dateObj['YY'];
    }
  }

  // Build proper order Arr of formated date
  const formatedDateArr = [];

  toFormat.slice(0, -1).forEach((element) => {
    if (element === 'YY' || element === 'YYYY') {
      formatedDateArr.push(dateObj['convYear']);
    } else {
      formatedDateArr.push(dateObj[element]);
    }
  });

  return formatedDateArr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
