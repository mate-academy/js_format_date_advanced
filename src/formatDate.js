'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, sourceFormat, targetFormat) {
  // Разделитель для исходного и целевого форматов
  const [, , , sourceSeparator] = sourceFormat;
  const [, , , targetSeparator] = targetFormat;

  // Разделение даты по разделителю исходного формата
  const dateParts = date.split(sourceSeparator);
  const [sourceYear, sourceMonth, sourceDay] = dateParts;

  const formattedDateParts = [];

  // Переформатирование даты в зависимости от исходного и целевого форматов
  if (
    sourceFormat[0] === 'YYYY' &&
    targetFormat[0] === 'DD' &&
    targetFormat[1] === 'MM' &&
    targetFormat[2] === 'YYYY'
  ) {
    formattedDateParts.push(sourceDay, sourceMonth, sourceYear);
  } else if (targetFormat[2] === 'YY' && sourceFormat[2] === 'YYYY') {
    formattedDateParts.push(
      dateParts[0],
      dateParts[1],
      dateParts[2].slice(2, 4),
    );
  } else if (sourceFormat[0] === 'YY' && targetFormat[0] === 'YYYY') {
    const fullYear = sourceYear < 30 ? `20${sourceYear}` : `19${sourceYear}`;

    formattedDateParts.push(fullYear, sourceMonth, sourceDay);
  } else if (sourceFormat[0] === 'YY' && targetFormat[0] === 'DD') {
    const fullYear = sourceYear < 30 ? `20${sourceYear}` : `19${sourceYear}`;

    formattedDateParts.push(sourceDay, sourceMonth, fullYear);
  } else if (
    sourceFormat[0] === targetFormat[0] &&
    sourceFormat[1] === targetFormat[1] &&
    sourceFormat[2] === targetFormat[2]
  ) {
    return dateParts.join(targetSeparator);
  } else {
    formattedDateParts.push(dateParts[2], dateParts[0], dateParts[1]);
  }

  return formattedDateParts.join(targetSeparator);
}

module.exports = formatDate;
