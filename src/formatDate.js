'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  // formatDate(
  //   '2020-02-18',
  //   ['YYYY', 'MM', 'DD', '-'],
  //   ['YYYY', 'MM', 'DD', '.'],
  // );
  const FROM_FORMAT_SYMBOL = fromFormat[3];
  const TO_FORMAT_SYMBOL = toFormat[3];
  const SEPARATE_DATE = date.split(FROM_FORMAT_SYMBOL);
  const resultDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      for (let k = 0; k < toFormat.length - 1; k++) {
        if (toFormat[k] === 'YYYY' || toFormat[k] === 'YY') {
          const LENGTH_OF_YEAR_IN_TO_FORMAT = toFormat[k].length;

          if (fromFormat[i].length === LENGTH_OF_YEAR_IN_TO_FORMAT) {
            resultDate[k] = SEPARATE_DATE[i];
          } else {
            if (fromFormat[i].length > LENGTH_OF_YEAR_IN_TO_FORMAT) {
              resultDate[k] = SEPARATE_DATE[i].slice(2);
            } else {
              if (Number(SEPARATE_DATE[i]) < 30) {
                resultDate[k] = `20${SEPARATE_DATE[i]}`;
              } else {
                resultDate[k] = `19${SEPARATE_DATE[i]}`;
              }
            }
          }
        }
      }
    }

    if (fromFormat[i] === 'MM') {
      for (let k = 0; k < toFormat.length - 1; k++) {
        if (toFormat[k] === 'MM') {
          resultDate[k] = SEPARATE_DATE[i];
        }
      }
    }

    if (fromFormat[i] === 'DD') {
      for (let k = 0; k < toFormat.length - 1; k++) {
        if (toFormat[k] === 'DD') {
          resultDate[k] = SEPARATE_DATE[i];
        }
      }
    }
  }

  return resultDate.join(TO_FORMAT_SYMBOL);
}

module.exports = formatDate;
