/**
 * Converts date string from one format to another
 * @param {string} date - Date string to convert
 * @param {Array} fromFormat - Array of format parts for input date
 * @param {Array} toFormat - Array of format parts for output date
 * @returns {string} - Converted date string
 */
function formatDate(date, fromFormat, toFormat) {
  // Split date string by separator
  const separator = fromFormat[3];
  const parts = date.split(separator);

  // Create object with date parts
  const dateParts = {
    YYYY: '',
    YY: '',
    MM: '',
    DD: '',
  };

  // Map parts to their format
  fromFormat.forEach((format, index) => {
    if (format !== separator) {
      dateParts[format] = parts[index];
    }
  });

  // Handle year conversion
  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateParts.YY = dateParts.YYYY.slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(dateParts.YY);

    dateParts.YYYY = year < 30 ? `20${dateParts.YY}` : `19${dateParts.YY}`;
  }

  // Build result string
  const result = toFormat
    .filter((format) => format !== toFormat[3]) // Remove separator from parts
    .map((format) => {
      if (format === 'YYYY') {
        return dateParts.YYYY;
      }

      if (format === 'YY') {
        return dateParts.YY;
      }

      if (format === 'MM') {
        return dateParts.MM;
      }

      if (format === 'DD') {
        return dateParts.DD;
      }

      return format;
    })
    .join(toFormat[3]); // Join with new separator

  return result;
}

module.exports = formatDate;
