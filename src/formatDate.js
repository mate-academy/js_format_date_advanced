'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const YEAR_BORDER = 30;
  const currentSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const currentFormatDateArr = date.split(currentSeparator);
  const newFormatDateArr = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (let fromFormatIndex = 0;
      fromFormatIndex < fromFormat.length - 1; fromFormatIndex++) {
      if (toFormat[i].includes(fromFormat[fromFormatIndex].slice(0, 1))) {
        newFormatDateArr[i] = currentFormatDateArr[fromFormatIndex];

        if (toFormat[i] !== fromFormat[fromFormatIndex]) {
          newFormatDateArr[i]
            = yearModify(currentFormatDateArr[fromFormatIndex], toFormat[i]);
        }
      }
    }
  }

  function yearModify(from, to) {
    if (from.length > to.length) {
      return from.slice(2); // saving 2 last numbers of year
    } else if (from < YEAR_BORDER) {
      return 20 + from;
    } else {
      return 19 + from;
    }
  }

  return newFormatDateArr.join(newSeparator);
}

module.exports = formatDate;
