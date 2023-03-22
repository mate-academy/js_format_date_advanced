'use strict';

function formatDate(date, fromFormat, toFormat) {
  const actualDate = date.split(fromFormat[3]);
  let DD = '';
  let MM = '';
  let YY = '';
  let YYYY = '';
  const result = [];

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        DD = actualDate[i];
        break;

      case 'MM':
        MM = actualDate[i];
        break;

      case 'YY':
        YY = actualDate[i];
        break;

      case 'YYYY':
        YYYY = actualDate[i];
        break;

      default:
        break;
    }
  }

  if (YY === '') {
    YY = YYYY.slice(2);
  } else if (YYYY === '' && YY <= 23) {
    YYYY = `20${YY}`;
  } else if (YYYY === '' && YY > 23) {
    YYYY = `19${YY}`;
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'DD':
        result.push(DD);
        break;

      case 'MM':
        result.push(MM);
        break;

      case 'YY':
        result.push(YY);
        break;

      case 'YYYY':
        result.push(YYYY);
        break;

      default:
        break;
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
