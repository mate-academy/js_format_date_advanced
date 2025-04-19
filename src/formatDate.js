'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let unifier;

  if (date.includes('/')) {
    unifier = '/';
  }

  if (date.includes('-')) {
    unifier = '-';
  }

  if (date.includes('.')) {
    unifier = '.';
  }

  const DATE_ARR = date.split(unifier);

  const COUNTER = toFormat.length;
  const CORRECT = [];

  for (let i = 0; i < COUNTER - 1; i++) {
    const TO = toFormat[i];
    let index;

    for (let j = 0; j < COUNTER; j++) {
      const FROM = fromFormat[j];

      if (TO.includes(FROM[0])) {
        index = toFormat.indexOf(TO);

        if (TO.length > FROM.length) {
          if (+DATE_ARR[j] < 25) {
            DATE_ARR[j] = DATE_ARR[j].padStart(4, '20');
          } else {
            DATE_ARR[j] = DATE_ARR[j].padStart(4, '19');
          }
        } else if (TO.length < FROM.length) {
          DATE_ARR[j] = DATE_ARR[j].slice(2);
        }
        CORRECT[index] = DATE_ARR[j];
      }
    }
  }

  unifier = toFormat[toFormat.length - 1];

  return CORRECT.join(unifier);
}

module.exports = formatDate;
