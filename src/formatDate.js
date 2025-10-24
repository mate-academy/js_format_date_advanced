'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [fromF1, fromF2, fromF3, fromSeparator] = fromFormat;
  const [toF1, toF2, toF3, toSeparator] = toFormat;

  const parts = date.split(fromSeparator);

  const originalData = {
    [fromF1]: parts[0],
    [fromF2]: parts[1],
    [fromF3]: parts[2],
  };

  function to4digitYear(yy) {
    const fullYear = Number(yy);

    return fullYear < 30 ? 2000 + fullYear : 1900 + fullYear;
  }

  let year;

  if (originalData.YYYY !== undefined) {
    year = Number(originalData.YYYY);
  } else if (originalData.YY !== undefined) {
    const yy = Number(originalData.YY);

    year = to4digitYear(yy);
  } else {
    throw new Error('Formato de ano não encontrado.');
  }

  const month = Number(originalData.MM);
  const day = Number(originalData.DD);

  function pad(num, size) {
    return String(num).padStart(size, '0');
  }

  function render(token) {
    switch (token) {
      case 'YYYY':
        return pad(year, 4);
      case 'YY':
        return pad(year % 100, 2); // pega só os dois últimos dígitos
      case 'MM':
        return pad(month, 2);
      case 'DD':
        return pad(day, 2);
      default:
        throw new Error(`Token desconhecido: ${token}`);
    }
  }

  return [render(toF1), render(toF2), render(toF3)].join(toSeparator);
}

module.exports = formatDate;
