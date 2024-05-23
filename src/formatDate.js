'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDate = date.split(fromFormat[3]);
  const newDelimiter = toFormat[toFormat.length - 1];
  const dateParts = {
    day: '',
    month: '',
    year: '',
  };
  const formatedDate = [];

  fromFormat.forEach((part, i) => {
    switch (part) {
      case 'YY':
        dateParts.year = oldDate[i];
        break;

      case 'YYYY':
        dateParts.year = oldDate[i];
        break;

      case 'DD':
        dateParts.day = oldDate[i];
        break;

      case 'MM':
        dateParts.month = oldDate[i];
        break;
    }
  });

  toFormat.forEach((part) => {
    switch (part) {
      case 'YY':
        if (dateParts.year.length === 4) {
          formatedDate.push(dateParts.year.slice(2));
        } else {
          formatedDate.push(dateParts.year);
        }
        break;

      case 'YYYY':
        if (dateParts.year.length === 2) {
          const prefix =
            +dateParts.year < 30 || dateParts.year === '00' ? '20' : '19';
          const fullYear = prefix + dateParts.year;

          if (!formatedDate.includes(fullYear)) {
            formatedDate.push(fullYear);
          }
        } else {
          formatedDate.push(dateParts.year);
        }
        break;

      case 'DD':
        formatedDate.push(dateParts.day);
        break;

      case 'MM':
        formatedDate.push(dateParts.month);
        break;
    }
  });

  return formatedDate.join(newDelimiter);
}

module.exports = formatDate;
