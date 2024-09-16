'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const resultedDate = [];
  const separatedDate = date.split(fromFormat[3]);

  const currentYear = separatedDate[fromFormat.indexOf('YY')]
    || separatedDate[fromFormat.indexOf('YYYY')];
  const dateComponents = toFormat.slice(0, -1);

  dateComponents.forEach((component) => {
    const fromIndex = fromFormat.indexOf(component);
    const toIndex = toFormat.indexOf(component);

    if (fromIndex !== -1 && toIndex !== -1) {
      resultedDate[toIndex] = separatedDate[fromIndex];
    }
  });

  const yearFormat = currentYear < 30
    ? '20'
    : '19';

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':

        resultedDate[i] = (
          fromFormat.includes('YY')
            ? yearFormat
            : ''
        ) + currentYear;
        break;

      case 'YY':
        const indexOfYY = toFormat.indexOf('YY');

        if (indexOfYY !== -1) {
          resultedDate[indexOfYY] = currentYear.slice(-2);
        }

        break;

      default:
        break;
    }
  }

  return resultedDate.join(toFormat[3]);
}

module.exports = formatDate;
