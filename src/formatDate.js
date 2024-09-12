'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const formattedDateArr = [];
  let formattedYear;
  let day;
  let month;
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);

  for (let i = 0; i < dateParts.length; i++) {
    if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
      if (i === fromFormat.indexOf('YYYY')) {
        formattedYear = dateParts[i].slice(2);
      }
    } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
      if (i === fromFormat.indexOf('YY')) {
        if (dateParts[i] < 30) {
          formattedYear = `20${dateParts[i]}`;
        } else {
          formattedYear = `19${dateParts[i]}`;
        }
      }
    } else if (i === fromFormat.indexOf('YY')
    || i === fromFormat.indexOf('YYYY')) {
      formattedYear = dateParts[i];
    }

    if (i === fromFormat.indexOf('MM')) {
      month = dateParts[i];
    }

    if (i === fromFormat.indexOf('DD')) {
      day = dateParts[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      formattedDateArr.push(day);
    } else if (toFormat[i] === 'MM') {
      formattedDateArr.push(month);
    } else {
      formattedDateArr.push(formattedYear);
    }
  }

  return formattedDateArr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
