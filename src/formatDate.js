'use strict';

function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);

  let day;
  let month;
  let year;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = dateArray[i];
        break;

      case 'MM':
        month = dateArray[i];
        break;

      default:
        year = dateArray[i];
        break;
    }
  }

  const result = [];
  const separator = toFormat[toFormat.length - 1];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      result.push(day);
    }

    if (toFormat[i] === 'MM') {
      result.push(month);
    }

    if (toFormat[i] === 'YY') {
      if (year.length > 2) {
        result.push(year.slice(2));
      } else {
        result.push(year);
      }
    }

    if (toFormat[i] === 'YYYY') {
      if (year.length === 2 && year >= 30) {
        result.push(`19${year}`);
      };

      if (year.length === 2 && year < 30) {
        result.push(`20${year}`);
      };

      if (year.length === 4) {
        result.push(year);
      }
    }
  }

  return result.join(separator);
}

module.exports = formatDate;
