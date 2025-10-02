'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat.at(-1);
  const valueOfDate = date.split(`${oldSeparator}`);
  const newSeparator = toFormat.at(-1);
  const valueOfnewFormat = toFormat.slice(0, -1);
  const formatedDate = [];

  valueOfnewFormat.forEach((el) => {
    let indexValOfDate = fromFormat.indexOf(el);

    if (indexValOfDate === -1) {
      indexValOfDate =
        el.length === 2
          ? fromFormat.indexOf(`${el.repeat(2)}`)
          : fromFormat.indexOf(`${el.slice(0, 2)}`);
    }

    if (valueOfDate[indexValOfDate].length > el.length) {
      formatedDate.push(valueOfDate[indexValOfDate].slice(2), newSeparator);
    } else if (valueOfDate[indexValOfDate].length < el.length) {
      const newValue =
        +valueOfDate[indexValOfDate] < 30
          ? `20${valueOfDate[indexValOfDate]}`
          : `19${valueOfDate[indexValOfDate]}`;

      formatedDate.push(newValue, newSeparator);
    } else {
      formatedDate.push(valueOfDate[indexValOfDate], newSeparator);
    }
  });

  return formatedDate.slice(0, -1).join('');
}

module.exports = formatDate;
