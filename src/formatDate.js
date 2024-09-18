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

  const spliteOldDate = date.split(oldSeparator);

  const newDate = Array(3);

  for (let i = 0; i < spliteOldDate.length; i++) {
    const oldPart = fromFormat[i];

    let index = toFormat.indexOf(oldPart);

    newDate[index] = spliteOldDate[i];

  }

  if( toFormat.includes('YY') && !fromFormat.includes('YY')){
    const index = fromFormat.indexOf('YYYY');
    newDate[toFormat.indexOf('YY')] = spliteOldDate[index].slice(2);
  }

  if( toFormat.includes('YYYY') && !fromFormat.includes('YYYY')){
    const index = fromFormat.indexOf('YY');
    newDate[toFormat.indexOf('YYYY')] = +spliteOldDate[index] < 30
      ? `20${spliteOldDate[index]}`
      : `19${spliteOldDate[index]}`;
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
