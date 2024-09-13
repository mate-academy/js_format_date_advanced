'use strict';

function formatDate(date, fromFormat, toFormat) {
  const dateComponents = date.split(fromFormat[fromFormat.length - 1]);
  const formatedDate = [];
  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = dateComponents[i];
        break;

      case 'MM':
        month = dateComponents[i];
        break;

      case 'YY':
        year = dateComponents[i];
        break;

      case 'YYYY':
        year = dateComponents[i];
        break;

      default: {
        throw new Error('invalid value');
      }
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
        break;
      }

      default: {
        throw new Error('invalid value');
      }
    }
  }

  return formatedDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
