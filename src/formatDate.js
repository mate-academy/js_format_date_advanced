'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat.pop();
  const separatorTo = toFormat.pop();

  const dateParts = {};
  const dateSegments = date.split(separatorFrom);

  fromFormat.forEach((part, index) => {
    dateParts[part] = dateSegments[index];
  });

  if (dateParts['YYYY'] && dateParts['YY'] === undefined) {
    dateParts['YY'] = dateParts['YYYY'].slice(-2);
  } else if (dateParts['YY'] && dateParts['YYYY'] === undefined) {
    const year = parseInt(dateParts['YY'], 10);

    dateParts['YYYY'] =
      year < 30 ? `20${dateParts['YY']}` : `19${dateParts['YY']}`;
  }

  const result = toFormat.map((part) => dateParts[part]).join(separatorTo);

  return result;
}

module.exports = formatDate;
