'use strict';

function formatDate(date, fromFormat, toFormat) {
  const dateToArrow = date.split(fromFormat[fromFormat.length - 1]);
  const formatedDate = [];
  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = dateToArrow[i];
        break;

      case 'MM':
        month = dateToArrow[i];
        break;

      default:
        year = dateToArrow[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'DD': {
        formatedDate.push(day);
        break;
      }

      case 'MM': {
        formatedDate.push(month);
        break;
      }

      case 'YY': {
        if (year.length === 4) {
          formatedDate.push(year.slice(2));
        } else {
          formatedDate.push(year);
        }
        break;
      }

      case 'YYYY': {
        if (year.length === 4) {
          formatedDate.push(year);
        } else if (year.length === 2 && +year < 30) {
          formatedDate.push(`20${year}`);
        } else {
          formatedDate.push(`19${year}`);
        }
      }
    }
  }

  return formatedDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
