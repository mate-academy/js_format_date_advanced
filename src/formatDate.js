'use strict';

function formatDate(dateString, fromFormat, toFormat) {
  // Extract parts from the input date string
  const extractParts = (str, format) => {
    const values = str.split(format[3]);

    return format.slice(0, 3).reduce((acc, key, i) => {
      acc[key] = values[i];

      return acc;
    }, {});
  };

  // Convert two-digit year (YY) to four-digit (YYYY)
  const toFullYear = (yy) => (yy < 30 ? `20${yy}` : `19${yy}`);

  // Extract date parts
  const extractedParts = extractParts(dateString, fromFormat);

  // Build new date parts based on toFormat
  const formattedParts = toFormat.slice(0, 3).map((part) => {
    if (part === 'YYYY') {
      return extractedParts['YYYY'] || toFullYear(extractedParts['YY']);
    }

    if (part === 'YY') {
      return extractedParts['YYYY']
        ? extractedParts['YYYY'].slice(2)
        : extractedParts['YY'];
    }

    return extractedParts[part];
  });

  // Return formatted date with new separator
  return formattedParts.join(toFormat[3]);
}

module.exports = formatDate;
