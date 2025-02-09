'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const dateParts = {
    get YY() {
      return this._YY;
    },
    set YY(value) {
      this._YY = value;

      if (+value < 30) {
        this._YYYY = '20' + value;
      } else {
        this._YYYY = '19' + value;
      }
    },
    get YYYY() {
      return this._YYYY;
    },
    set YYYY(value) {
      this._YYYY = value;
      this._YY = value.split('').slice(2).join('');
    },
    _YY: null,
    _YYYY: null,
    MM: null,
    DD: null,
  };
  const delemiter = fromFormat[fromFormat.length - 1];
  let inputDate = date;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const formattedSegments = inputDate.split(delemiter);

    switch (fromFormat[i]) {
      case 'YY':
        dateParts.YY = inputDate.split(delemiter, 1)[0];
        break;
      case 'YYYY':
        dateParts.YYYY = inputDate.split(delemiter, 1)[0];
        break;
      case 'MM':
        dateParts.MM = inputDate.split(delemiter, 1)[0];
        break;
      case 'DD':
        dateParts.DD = inputDate.split(delemiter, 1)[0];
        break;
    }

    formattedSegments.splice(0, 1);

    inputDate = formattedSegments.join(delemiter);
  }

  let result = '';

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YY':
        result += dateParts.YY;
        break;
      case 'YYYY':
        result += dateParts.YYYY;
        break;
      case 'MM':
        result += dateParts.MM;
        break;
      case 'DD':
        result += dateParts.DD;
        break;
    }

    if (i === toFormat.length - 2) {
      break;
    }
    result += toFormat[toFormat.length - 1];
  }

  return result;
}

module.exports = formatDate;
