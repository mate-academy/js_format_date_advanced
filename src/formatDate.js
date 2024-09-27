'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const dataAsObject = date.split(fromSeparator).reduce((obj, item, index) => {
    obj[fromFormat[index]] = item;

    return obj;
  }, {});

  function formatYear() {
    const minYear = 30;
    const greaterCentury = '20';
    const lowerCentury = '19';

    if (toFormat.includes('YYYY')) {
      return dataAsObject['YY'] < minYear
        ? greaterCentury + dataAsObject['YY']
        : lowerCentury + dataAsObject['YY'];
    }

    return dataAsObject['YYYY'].slice(2);
  }

  const formatedDate = toFormat
    .slice(0, -1)
    .map((item) => dataAsObject[item] || formatYear(item))
    .join(toSeparator);

  return formatedDate;
}

module.exports = formatDate;
