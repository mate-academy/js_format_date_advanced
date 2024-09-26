'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let separatorFrom = '';
  let separatorTo = '';
  let dateArr = [];
  let yyyyGenLong = '';
  let yyGenShort = '';
  let ddGen = '';
  let mmGen = '';
  const newDate = [];

  if (date === '') {
    return '';
  }

  for (let i = 3; i < toFormat.length; i++) {
    separatorFrom = fromFormat[3];
    separatorTo = toFormat[3];
    dateArr = date.split(separatorFrom);
  }

  for (let i = 0; i < dateArr.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      yyyyGenLong = dateArr[i];
      yyGenShort = dateArr[i].slice(2);
      continue;
    }

    if (fromFormat[i] === 'YY') {
      yyGenShort = dateArr[i];

      if (dateArr[i] < 30) {
        yyyyGenLong = `20${dateArr[i]}`;
      } else {
        yyyyGenLong = `19${dateArr[i]}`;
      }
      continue;
    }

    if (fromFormat[i] === 'MM') {
      mmGen = dateArr[i];
      continue;
    }

    if (fromFormat[i] === 'DD') {
      ddGen = dateArr[i];
      continue;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY') {
      newDate[i] = yyyyGenLong;
    }

    if (toFormat[i] === 'YY') {
      newDate[i] = yyGenShort;
    }

    if (toFormat[i] === 'MM') {
      newDate[i] = mmGen;
    }

    if (toFormat[i] === 'DD') {
      newDate[i] = ddGen;
    }
  }

  return newDate.join(separatorTo);
}

module.exports = formatDate;
