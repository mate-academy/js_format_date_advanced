// Constants
// Predefined date components' formats
const DATE_COMPONENTS = {
  FOUR_DIGIT_YEAR: 'YYYY',
  TWO_DIGIT_YEAR: 'YY',
  MONTH: 'MM',
  DAY: 'DD',
};

// Error message list
const ERROR_MESSAGES = {
  INVALID_FORMAT_ARRAY:
    'The format array must contain 3 date components ' +
    '(YYYY/YY, MM, DD) and one separator.',
  FORMAT_MISMATCH: (date, format) =>
    `Date "${date}" does not match` + ` the format "${format.join('')}".`,
  INVALID_DATE_COMPONENT: (name, value) =>
    `Invalid value for component "${name}": ${value}.`,
  MISSING_PROPERTY: (propName) =>
    `Property needs to be set "${propName}" before formatting.`,
};

// Date components' handlers
// Array of handlers for validation and processing each part of the date
const componentHandlers = {
  [DATE_COMPONENTS.FOUR_DIGIT_YEAR]: {
    validate: (year) => {
      const yearNum = parseInt(year, 10);

      if (isNaN(yearNum) || year.length !== 4) {
        throw new Error(ERROR_MESSAGES.INVALID_DATE_COMPONENT('YYYY', year));
      }
    },
    transform: (year, targetFormat) => {
      if (targetFormat === DATE_COMPONENTS.TWO_DIGIT_YEAR) {
        return year.slice(-2); // 1997 -> 97
      }

      return year;
    },
  },
  [DATE_COMPONENTS.TWO_DIGIT_YEAR]: {
    validate: (year) => {
      const yearNum = parseInt(year, 10);

      if (isNaN(yearNum) || year.length !== 2) {
        throw new Error(ERROR_MESSAGES.INVALID_DATE_COMPONENT('YY', year));
      }
    },
    transform: (year, targetFormat) => {
      if (targetFormat === DATE_COMPONENTS.FOUR_DIGIT_YEAR) {
        const yearNum = parseInt(year, 10);

        // If YY < 30, we're using 20YY, otherway 19YY.
        return yearNum < 30 ? `20${year}` : `19${year}`;
      }

      return year;
    },
  },
  [DATE_COMPONENTS.MONTH]: {
    validate: (month) => {
      const monthNum = parseInt(month, 10);

      if (
        isNaN(monthNum) ||
        month.length !== 2 ||
        monthNum < 1 ||
        monthNum > 12
      ) {
        throw new Error(ERROR_MESSAGES.INVALID_DATE_COMPONENT('MM', month));
      }
    },
    transform: (month) => month, // Month format will be the same
  },
  [DATE_COMPONENTS.DAY]: {
    validate: (day) => {
      const dayNum = parseInt(day, 10);

      if (isNaN(dayNum) || day.length !== 2 || dayNum < 1 || dayNum > 31) {
        throw new Error(ERROR_MESSAGES.INVALID_DATE_COMPONENT('DD', day));
      }
    },
    transform: (day) => day, // Day format will be the same
  },
};

/**
 * Base formatter class
 */
class DateFormatter {
  constructor() {
    this._date = null;
    this._fromFormat = null;
    this._toFormat = null;

    // Inner storage for parsed data parts
    this._parsedData = {};
  }

  // --- GETTERS & SETTERS ---

  /**
   * Set the original date string
   * @param {string} dateStr
   */
  set date(dateStr) {
    if (typeof dateStr !== 'string' || dateStr.trim() === '') {
      throw new Error('Date string should not be an empty');
    }
    this._date = dateStr;
  }

  get date() {
    return this._date;
  }

  /**
   * Set the original date format
   * @param {string[]} formatArr - array of format components
   *     for example ['YYYY', 'MM', 'DD', '-']
   */
  set fromFormat(formatArr) {
    this._validateFormatArray(formatArr);
    this._fromFormat = formatArr;
  }

  get fromFormat() {
    return this._fromFormat;
  }

  /**
   * Set the target date format
   * @param {string[]} formatArr - array of format components
   *     for example ['YYYY', 'MM', 'DD', '-']
   */
  set toFormat(formatArr) {
    this._validateFormatArray(formatArr);
    this._toFormat = formatArr;
  }

  get toFormat() {
    return this._toFormat;
  }

  // --- PRIVATE METHODS ---

  /**
   * Check if the format array is correct
   * @param {string[]} formatArr - array to check
   * @private
   */
  _validateFormatArray(formatArr) {
    if (!Array.isArray(formatArr) || formatArr.length !== 4) {
      throw new Error(ERROR_MESSAGES.INVALID_FORMAT_ARRAY);
    }

    const components = formatArr.slice(0, 3);
    const hasYear = components.some((c) => c === 'YYYY' || c === 'YY');
    const hasMonth = components.includes('MM');
    const hasDay = components.includes('DD');

    if (!hasYear || !hasMonth || !hasDay) {
      throw new Error(ERROR_MESSAGES.INVALID_FORMAT_ARRAY);
    }
  }

  /**
   * Extract components from origin date string
   * @private
   */
  _parse() {
    const separator = this._fromFormat[3];
    const dateParts = this._date.split(separator);
    const formatParts = this._fromFormat.slice(0, 3);

    if (dateParts.length !== 3) {
      throw new Error(
        ERROR_MESSAGES.FORMAT_MISMATCH(this._date, this._fromFormat),
      );
    }

    formatParts.forEach((formatComponent, index) => {
      const dateValue = dateParts[index];

      // Validation of each part of date with corresponding handler
      componentHandlers[formatComponent].validate(dateValue);
      // store original value
      this._parsedData[formatComponent] = dateValue;
    });
  }

  /**
   * Combain the new date string from separated components
   * @returns {string} - formatted date string
   * @private
   */
  _assemble() {
    const newSeparator = this._toFormat[3];
    const newFormatParts = this._toFormat.slice(0, 3);

    const resultParts = newFormatParts.map((targetFormatComponent) => {
      // looking for source component type
      // YYYY/YY -> Y, MM -> M, DD -> D
      const sourceComponentKey = Object.keys(this._parsedData).find((key) =>
        key.includes(targetFormatComponent.slice(0, 1)),

        );
      const sourceValue = this._parsedData[sourceComponentKey];
      const handler = componentHandlers[sourceComponentKey];

      // Transform value
      // YYYY -> YY
      return handler.transform(sourceValue, targetFormatComponent);
    });

    return resultParts.join(newSeparator);
  }

  // --- Public Methods ---

  /**
   * Format date
   * @returns {string} - New date string
   */
  format() {
    if (!this._date) {
      throw new Error(ERROR_MESSAGES.MISSING_PROPERTY('date'));
    }

    if (!this._fromFormat) {
      throw new Error(ERROR_MESSAGES.MISSING_PROPERTY('fromFormat'));
    }

    if (!this._toFormat) {
      throw new Error(ERROR_MESSAGES.MISSING_PROPERTY('toFormat'));
    }

    this._parse();

    return this._assemble();
  }
}

/**
 * Wrapper function formatDate for universal use
 * @param {string} date - origin date string
 * @param {string[]} fromFormat - origin array of format
 * @param {string[]} toFormat - target array of format
 * @returns {string} - formatted data string
 */
/* jshint ignore:start */
function formatDate(date, fromFormat, toFormat) {
  /* jshint ignore:end */
  const formatter = new DateFormatter();

  formatter.date = date;
  formatter.fromFormat = fromFormat;
  formatter.toFormat = toFormat;

  return formatter.format();
}
