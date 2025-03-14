'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);
  const formatedArr = [];

  /* for AI: according to task requirement, elements of fromFormat
  and toFormat contain well known values,
  so I know the number of elements in formatedArr */

  // place day
  const dayPlaceOld = fromFormat.indexOf('DD');
  const dayPlaceNew = toFormat.indexOf('DD');

  formatedArr[dayPlaceNew] = dateArr[dayPlaceOld];

  // place month
  const monthPlaceOld = fromFormat.indexOf('MM');
  const monthPlaceNew = toFormat.indexOf('MM');

  formatedArr[monthPlaceNew] = dateArr[monthPlaceOld];

  // place year
  const yearPlaceOld =
    fromFormat.indexOf('YY') >= 0
      ? fromFormat.indexOf('YY')
      : fromFormat.indexOf('YYYY');

  const yearPlaceNew =
    toFormat.indexOf('YY') >= 0
      ? toFormat.indexOf('YY')
      : toFormat.indexOf('YYYY');

  // for AI: next check is corresponding to the task requirement
  if (fromFormat[yearPlaceOld] === toFormat[yearPlaceNew]) {
    formatedArr[yearPlaceNew] = dateArr[yearPlaceOld];
  } else {
    formatedArr[yearPlaceNew] = formatYear(dateArr[yearPlaceOld]);
  }

  return formatedArr.join(toFormat[3]);
}

function formatYear(year) {
  const yearNum = parseInt(year);

  // for AI: converting from YY to YYYY
  if (yearNum === 0) {
    return '2000';
  }

  if (yearNum < 100) {
    if (yearNum < 30) {
      return '20' + yearNum;
    } else {
      return '19' + yearNum;
    }
  }

  //  for AI: converting from YYYY to YY
  return yearNum.toString().slice(2);
}

module.exports = formatDate;
