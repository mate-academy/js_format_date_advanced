'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let yearLengthNew;

  for (const chars of toFormat) {
    if (chars.includes('Y')) {
      yearLengthNew = chars.length;
    }
  }

  const orderNew = toFormat[0].includes('Y') ? 1 : 0;
  const orderOld = fromFormat[0].includes('Y') ? 1 : 0;

  const separatorOld = fromFormat[3];
  const separatorNew = toFormat[3];

  let year;
  let month;
  let days;

  const dateArray = date.split(separatorOld);

  if (orderOld === 1) {
    year = dateArray[0];
    month = dateArray[1];
    days = dateArray[2];
  }

  if (orderOld === 0) {
    year = dateArray[2];
    month = dateArray[1];
    days = dateArray[0];
  }

  const century = year.slice(0, 3) < 30 ? 20 : 19;

  if (year.length > yearLengthNew) {
    year = year.slice(2);
  }

  if (year.length < yearLengthNew) {
    year = century + year;
  }

  if (orderNew === 1) {
    return year + separatorNew + month + separatorNew + days;
  } else {
    return days + separatorNew + month + separatorNew + year;
  }
}

module.exports = formatDate;
