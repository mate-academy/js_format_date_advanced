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

  for (let i = 0; i < splitedDate.length; i++) {
    const oldPart = fromFormat[i];

    for (let j = 0; j < splitedDate.length; j++) {
      const newPart = toFormat[j];

      if (oldPart[0] === newPart[0]) {
        let newDateElement = splitedDate[i];

        newDateElement = splitedDate[i];

        if (oldPart.length > newPart.length) {
          newDateElement = newDateElement.split('').slice(-2).join('');
        }

        if (oldPart.length < newPart.length) {
          newDateElement =
            +newDateElement < 30
              ? `20${newDateElement}`
              : `19${newDateElement}`;
        }

        newDate[j] = newDateElement;
      }
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
