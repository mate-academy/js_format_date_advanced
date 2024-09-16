'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const OLD_SEPARATOR = fromFormat[fromFormat.length - 1];
  const NEW_SEPARATOR = toFormat[toFormat.length - 1];

  const eachDate = date.split(OLD_SEPARATOR);
  const correctDate = [];

  for (let i = 0; i < eachDate.length; i++) {
    const correctIndex = toFormat.indexOf(fromFormat[i]);

    correctDate[correctIndex] = eachDate[i];
  }

  const IF_FROM_FORMAT_HAVE_YYYY = fromFormat.includes('YYYY');
  const IF_FROM_FORMAT_HAVE_YY = fromFormat.includes('YY');
  const IF_TO_FORMAT_HAVE_YY = toFormat.includes('YY');
  const IF_TO_FORMAT_HAVE_YYYY = toFormat.includes('YYYY');

  const TO_FT_YYYY_INDEX = toFormat.indexOf('YYYY');
  const TO_FT_YY_INDEX = toFormat.indexOf('YY');
  const FROM_FT_YYYY_INDEX = fromFormat.indexOf('YYYY');
  const FROM_FT_YY_INDEX = fromFormat.indexOf('YY');

  if (IF_FROM_FORMAT_HAVE_YYYY && IF_TO_FORMAT_HAVE_YY) {
    correctDate[TO_FT_YY_INDEX]
      = eachDate[FROM_FT_YYYY_INDEX] % 100;
  }

  if (IF_TO_FORMAT_HAVE_YYYY && IF_FROM_FORMAT_HAVE_YY) {
    const century = eachDate[FROM_FT_YY_INDEX] < 30 ? '20' : '19';

    correctDate[TO_FT_YYYY_INDEX]
      = century + eachDate[FROM_FT_YY_INDEX];
  }

  return correctDate.join(NEW_SEPARATOR);
}

module.exports = formatDate;
