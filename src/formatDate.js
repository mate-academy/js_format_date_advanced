'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [firstData, secondData, thirdData, separator] = fromFormat;
  const parseDate = date.split(separator);
  const keys = [firstData, secondData, thirdData].map((key) => {
    let newKey = key;

    if (key.includes('Y')) {
      newKey = 'year';
    }

    return newKey;
  });

  const oldFormatInfo = {
    [keys[0]]: parseDate[0],
    [keys[1]]: parseDate[1],
    [keys[2]]: parseDate[2],
  };

  const newDate = {};

  for (let i = 0; i < toFormat.length - 1; i++) {
    const key = toFormat[i];
    const value = oldFormatInfo[toFormat[i]];
    let year = oldFormatInfo.year;

    if (key.includes('Y')) {
      if (key.length === 4 && year.length < 4) {
        year = `${year < 30 ? 20 : 19}${year}`;
      } else if (key.length === 2 && year.length === 4) {
        year = year.slice(2);
      }
    }
    newDate[key] = value || year;
  }

  return Object.values(newDate).join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
