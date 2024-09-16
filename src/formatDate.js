'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const formatedDate = [];
  const partsDate = {};
  const oldSeparator = fromFormat.pop();
  const newSeparator = toFormat.pop();
  const initialDate = date.split(oldSeparator);

  fromFormat.forEach((partDate, index) => {
    partsDate[partDate] = initialDate[index];
  });

  if (partsDate.hasOwnProperty('YY')) {
    partsDate['YYYY'] = (partsDate['YY'] < 30)
      ? `20${partsDate['YY']}`
      : `19${partsDate['YY']}`;
  } else {
    partsDate['YY'] = partsDate['YYYY'].slice(2);
  }

  toFormat.forEach(partDate => {
    formatedDate.push(partsDate[partDate]);
  });

  return formatedDate.join(newSeparator);
}

module.exports = formatDate;
