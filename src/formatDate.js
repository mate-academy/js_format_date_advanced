'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const collectedData = date.split(fromFormat[3]);

  function checkIndex(check, element) {
    return check.findIndex((item) => item.includes(element));
  }

  const yearIndexF = checkIndex(fromFormat, 'Y');
  const monthIndexF = checkIndex(fromFormat, 'M');
  const dayIndexF = checkIndex(fromFormat, 'D');
  const yearIndexT = checkIndex(toFormat, 'Y');
  let yearElement = collectedData[yearIndexF];

  if (yearIndexT !== -1) {
    const targetYearFormat = toFormat[yearIndexT];

    if (targetYearFormat === 'YY' && yearElement.length > 2) {
      yearElement = yearElement.slice(-2);
    } else if (targetYearFormat === 'YYYY' && yearElement.length === 2) {
      yearElement =
        parseInt(yearElement) < 30 ? `20${yearElement}` : `19${yearElement}`;
    }
  }

  collectedData[yearIndexF] = yearElement;

  const sortedData = [];

  for (let i = 0; i < collectedData.length; i++) {
    const component = toFormat[i];

    if (component.includes('Y')) {
      sortedData.push(collectedData[yearIndexF]);
    }

    if (component.includes('M')) {
      sortedData.push(collectedData[monthIndexF]);
    }

    if (component.includes('D')) {
      sortedData.push(collectedData[dayIndexF]);
    }
  }

  return sortedData.join(toFormat[3]);
}

module.exports = formatDate;
