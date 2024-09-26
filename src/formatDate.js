'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = toFormat[toFormat.length - 1];
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  const inputFormat = fromFormat;

  const dateIndex = toFormat.indexOf('DD');
  const monthIndex = toFormat.indexOf('MM');
  const yearIndex = toFormat.findIndex((element) => element.includes('YY'));

  const compositeParts = dateArr.map((part, index) => {
    return inputFormat[index] + part;
  });

  const orderedComposites = [];

  orderedComposites[dateIndex] = compositeParts.find((format) => {
    return format.includes('DD');
  });

  orderedComposites[monthIndex] = compositeParts.find((format) => {
    return format.includes('MM');
  });

  orderedComposites[yearIndex] = compositeParts.find((format) => {
    return format.includes('YY');
  });

  const resultArray = orderedComposites.map((format) => format.slice(-2));

  if (toFormat[yearIndex].length === 4 && +resultArray[yearIndex] < 30) {
    resultArray[yearIndex] = 20 + resultArray[yearIndex];
  } else if (toFormat[yearIndex].length === 4
    && +resultArray[yearIndex] >= 30) {
    resultArray[yearIndex] = 19 + resultArray[yearIndex];
  }

  const result = resultArray.join(separator);

  return result;
}

module.exports = formatDate;
