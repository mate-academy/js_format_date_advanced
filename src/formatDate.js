'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fullDate = {};
  const newDate = [];
  const oldDate = date.split(fromFormat[3]);
  const newConnector = toFormat[3];
  const centuryStep = 30;

  for (let i = 0; i < fromFormat.length; i++) {
    fullDate[fromFormat[i]] = oldDate[i];

    if (fromFormat[i] === 'YY') {
      fullDate['YYYY'] = oldDate[i] < centuryStep
        ? `20${oldDate[i]}`
        : `19${oldDate[i]}`;
    }
  }

  for (const value of toFormat) {
    if (value === newConnector) {
      continue;
    }

    switch (value) {
      case 'YY':
        newDate.push(fullDate['YYYY'].slice(2));
        break;

      default:
        newDate.push(fullDate[value]);
        break;
    }
  }

  return newDate.join(newConnector);
}

module.exports = formatDate;
