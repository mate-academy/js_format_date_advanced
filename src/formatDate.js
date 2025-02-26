"use strict";

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat.pop();
  const dateParts = date.split(separator);
  const formatMap = {};

  fromFormat.forEach((part, index) => {
    formatMap[part] = dateParts[index];
  });

  if (formatMap["YYYY"]) {
    formatMap["YY"] = formatMap["YYYY"].slice(-2);
  } else if (formatMap["YY"]) {
    const year = parseInt(formatMap["YY"], 10);

    formatMap["YYYY"] = (year < 30 ? "20" : "19") + formatMap["YY"];
  }

  const newSeparator = toFormat.pop();

  return toFormat.map((part) => formatMap[part]).join(newSeparator);
}

module.exports = formatDate;
