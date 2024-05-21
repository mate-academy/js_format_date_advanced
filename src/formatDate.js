'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  const newDateFormat = [];
  const separator = toFormat[3];

  const year = fromFormat.find(el => el.includes('Y'));

  toFormat.forEach(newElement => {
    const index = fromFormat.findIndex(el => {
      return el.includes(newElement.slice(0, 1));
    });

    switch (newElement) {
      case 'YYYY':
        if (newElement > year) {
          const toPush = dateArray[index] === '00' || +dateArray[index] < 30
            ? '20' + dateArray[index]
            : '19' + dateArray[index];

          newDateFormat.push(toPush);
        } else {
          newDateFormat.push(dateArray[index]);
        }
        break;

      case 'YY':
        if (newElement < year) {
          newDateFormat.push(dateArray[index].slice(2));
        } else {
          newDateFormat.push(dateArray[index]);
        }
        break;

      case 'DD':
        newDateFormat.push(dateArray[index]);
        break;

      case 'MM':
        newDateFormat.push(dateArray[index]);
        break;

      default:
        break;
    }
  });

  return newDateFormat.join(separator);
}

module.exports = formatDate;
