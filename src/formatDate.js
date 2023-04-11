'use strict';

function formatDate(date, fromFormat, toFormat) {
  let year = '';
  let month = '';
  let day = '';

  for (let i = 0; i < fromFormat.length; i++) {
    const defaultPart = fromFormat[i];

    const separator = fromFormat.slice(-1)[0];

    switch (defaultPart) {
      case 'YYYY':
        year += date.split(separator)[i];
        break;

      case 'YY':
        const shortYear = parseInt(date.split(separator)[i], 10);

        if (shortYear === 0) {
          year += '2000';
        } else {
          year += shortYear < 30 ? `20${shortYear}` : `19${shortYear}`;
        }

        break;

      case 'MM':
        month += date.split(separator)[i];
        break;

      case 'DD':
        day += date.split(separator)[i];
        break;
    }
  }

  let formatedDate = '';

  for (let i = 0; i < toFormat.length; i++) {
    const formatingPart = toFormat[i];

    const separator = toFormat.slice(-1)[0];

    switch (formatingPart) {
      case 'YYYY':
        formatedDate += year + separator;
        break;

      case 'YY':
        formatedDate += year.slice(-2) + separator;
        break;

      case 'MM':
        formatedDate += month + separator;
        break;

      case 'DD':
        formatedDate += day + separator;
        break;
    }
  }

  formatedDate = formatedDate.slice(0, -1);

  return formatedDate;
}

module.exports = formatDate;
