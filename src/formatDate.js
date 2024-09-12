'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const startDay = date.split(fromFormat[3]);
  const numMass = [];
  const newMass = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (fromFormat[j] === toFormat[i]) {
        numMass.push(j);
      } else if (fromFormat[j] === 'YY' && toFormat[i] === 'YYYY') {
        if (startDay[j] > 20) {
          startDay[j] = `19${startDay[j]}`;
        } else {
          startDay[j] = `20${startDay[j]}`;
        }
        numMass.push(j);
      } else if (fromFormat[j] === 'YYYY' && toFormat[i] === 'YY') {
        startDay[j] = `${startDay[j][2]}${startDay[j][3]}`;
        numMass.push(j);
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    newMass[i] = startDay[numMass[i]];
  }

  return newMass.join(toFormat[3]);
}

module.exports = formatDate;
