'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const DATA_ARR = date.split(fromFormat[fromFormat.length - 1]);

  const TIME_OBJ = {
    'MM': null,
    'DD': null,
    'YY': null,
    'YYYY': null,
    get getYY() {
      return +this.YYYY % 100;
    },
    get getYYYY() {
      return +this.YY < 30 ? `20${this.YY}`
        : `19${this.YY}`;
    },
  };

  for (let i = 0; i < 3; i++) {
    TIME_OBJ[fromFormat[i]] = DATA_ARR[i];
  }

  const NEW_DATA_ARR = [];

  for (let i = 0; i < 3; i++) {
    NEW_DATA_ARR[i] = TIME_OBJ[toFormat[i]];

    if (NEW_DATA_ARR[i] === null) {
      NEW_DATA_ARR[i] = toFormat[i] === 'YYYY'
        ? TIME_OBJ.getYYYY : TIME_OBJ.getYY;
    }
  }

  return NEW_DATA_ARR.join(toFormat[3]);
}

module.exports = formatDate;
