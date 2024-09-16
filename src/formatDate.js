'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat.slice(-1));
  const [format, separator] = [toFormat.slice(0, -1), toFormat.slice(-1)];
  const temp = {};
  const resultDate = [];

  // making object to save all data from dateArray
  for (let i = 0; i < 3; i++) {
    temp[fromFormat[i][0]] = dateArray[i];
  };

  // formatting year
  switch (temp.Y.length) {
    case 4 :
      temp.Y = toFormat.indexOf('YY') === -1
        ? temp.Y
        : temp.Y.slice(-2);
      break;

    default :
      temp.Y = toFormat.indexOf('YY') === -1
        ? +temp.Y < 30
          ? `20${temp.Y}`
          : `19${temp.Y}`
        : temp.Y;
      break;
  };

  // making final array in right order
  for (const form of format) {
    resultDate.push(temp[form[0]]);
  };

  // returning string from array
  return resultDate.join(separator);
}

module.exports = formatDate;
