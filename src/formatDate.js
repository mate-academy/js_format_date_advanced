'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromDate, toDate) {
  const indexDd = fromDate.indexOf('DD');
  const indexMm = fromDate.indexOf('MM');
  const indexYyyy = fromDate.indexOf('YYYY');
  const indexYy = fromDate.indexOf('YY');

  const dateArr = date.split(fromDate[3]);

  const dd = dateArr[indexDd];
  const mm = dateArr[indexMm];
  let yyyy = dateArr[indexYyyy];
  let yy = dateArr[indexYy];

  if (fromDate.indexOf('YYYY') === -1) {
    if (yy < 30) {
      yyyy = '20' + yy;
    } else {
      yyyy = '19' + yy;
    }
  } else {
    yy = yyyy.slice(-2);
  }

  let newFormatDate = '';

  for (let i = 0; i < toDate.length - 1; i++) {
    switch (toDate[i]) {
      case 'DD':
        newFormatDate += dd;
        break;
      case 'MM':
        newFormatDate += mm;
        break;
      case 'YYYY':
        newFormatDate += yyyy;
        break;
      case 'YY':
        newFormatDate += yy;
        break;
    }

    if (i !== toDate.length - 2) {
      newFormatDate += toDate[3];
    }
  }

  return newFormatDate;
}
module.exports = formatDate;
