'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const YEAR_FORMAT_TWO_CHARS = 'YY';
  const YEAR_FORMAT_FOUR_CHARS = 'YYYY';
  const XX_CENTURE = '19';
  const XXI_CENTURE = '20';
  const XXI_CENTURE_MAX_YEAR = 30;
  const SEPARATOR_INDEX = 3;

  const fromSeparator = fromFormat[SEPARATOR_INDEX];
  const toSeparator = toFormat[SEPARATOR_INDEX];
  const toFormatKeys = toFormat.slice(0, SEPARATOR_INDEX);

  const dateParts = date.split(fromSeparator);

  const dateWithFormat = dateParts.reduce((prev, part, index) => {
    const formatKey = fromFormat[index];

    return { ...prev, [formatKey]: part };
  }, {});

  const formatedDateParts = toFormatKeys.map((formatKey) => {
    if (formatKey in dateWithFormat) {
      return dateWithFormat[formatKey];
    }

    const year = dateWithFormat[YEAR_FORMAT_TWO_CHARS]
      || dateWithFormat[YEAR_FORMAT_FOUR_CHARS];

    if (formatKey === YEAR_FORMAT_TWO_CHARS) {
      return year.slice(2);
    }

    const centuary = (+year < XXI_CENTURE_MAX_YEAR) ? XXI_CENTURE : XX_CENTURE;

    return centuary + year;
  });

  return formatedDateParts.join(toSeparator);
}

module.exports = formatDate;
