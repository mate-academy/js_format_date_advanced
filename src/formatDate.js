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
  const oldSeparator = fromFormat.pop();
  const newSeparator = toFormat.pop();

  const splitedDate = date.split(oldSeparator);

  const newDate = [];

  let yearFormat = toFormat.includes('YY') ? 'YY' : 'YYYY';

  for (let i = 0; i < splitedDate.length; i++) {
    const oldPart = fromFormat[i];
    let index = toFormat.indexOf(oldPart);

    if(oldPart.includes('Y') && oldPart !== yearFormat) {
      index = toFormat.indexOf(yearFormat);
    }

    const newPart = toFormat[index];
    
    if (oldPart.length > newPart.length) {
      splitedDate[i] = splitedDate[i].split('').slice(-2).join('');
    }

    if (oldPart.length < newPart.length) {
      splitedDate[i] =
        +splitedDate[i] < 30
          ? `20${splitedDate[i]}`
          : `19${splitedDate[i]}`;
    }

    newDate[index] = splitedDate[i];

  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
