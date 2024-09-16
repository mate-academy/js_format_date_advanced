'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let day, month, year;
  const dateFinal = [];
  const separator = fromFormat.pop();
  const separatorNew = toFormat.pop();
  const dateInput = date.split(separator);

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'DD' :
        day = dateInput[i];
        break;
      case 'MM' :
        month = dateInput[i];
        break;
      case 'YYYY' :
        year = dateInput[i];
        break;
      case 'YY' :
        if (dateInput[i] > 20 && dateInput[i] < 99) {
          year = '19' + dateInput[i];
        } else {
          year = '20' + dateInput[i];
        }
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD' :
        dateFinal.push(day);
        break;
      case 'MM' :
        dateFinal.push(month);
        break;
      case 'YYYY' :
        dateFinal.push(year);
        break;
      case 'YY' :
        dateFinal.push(year.substr(2, 4));
        break;
    }
  }

  return dateFinal.join(separatorNew);
}

module.exports = formatDate;
