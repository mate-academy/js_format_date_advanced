/* eslint-disable no-unused-vars */
// --- КОНСТАНТЫ ---
// Определяем неизменяемые значения для частей даты и форматов.
const DATE_COMPONENTS = {
  FOUR_DIGIT_YEAR: 'YYYY',
  TWO_DIGIT_YEAR: 'YY',
  MONTH: 'MM',
  DAY: 'DD',
};

// --- МОДУЛЬНЫЕ ОБРАБОТЧИКИ ---
// Массив функций-обработчиков для валидации и преобразования каждой части даты.
// Такой подход позволяет легко добавлять новые форматы в будущем.

const componentHandlers = {
  [DATE_COMPONENTS.FOUR_DIGIT_YEAR]: {
    transform: (year, targetFormat) => {
      if (targetFormat === DATE_COMPONENTS.TWO_DIGIT_YEAR) {
        return year.slice(-2); // 1997 -> 97
      }

      return year;
    },
  },
  [DATE_COMPONENTS.TWO_DIGIT_YEAR]: {
    transform: (year, targetFormat) => {
      if (targetFormat === DATE_COMPONENTS.FOUR_DIGIT_YEAR) {
        const yearNum = parseInt(year, 10);

        // Если YY < 30, используем 20YY, иначе 19YY.
        return yearNum < 30 ? `20${year}` : `19${year}`;
      }

      return year;
    },
  },
  [DATE_COMPONENTS.MONTH]: {
    transform: (month) => month, // Формат месяца не меняется
  },
  [DATE_COMPONENTS.DAY]: {
    transform: (day) => day, // Формат дня не меняется
  },
};

/**
 * Основной класс для форматирования дат.
 */
class DateFormatter {
  constructor() {
    this._date = null;
    this._fromFormat = null;
    this._toFormat = null;

    // Внутреннее хранилище для разобранных частей даты
    this._parsedData = {};
  }

  // --- GETTERS & SETTERS ---

  /**
   * Устанавливает исходную строку даты.
   * @param {string} dateStr - Строка с датой, например, '2020-02-18'.
   */
  set date(dateStr) {
    if (typeof dateStr !== 'string' || dateStr.trim() === '') {
      throw new Error('Дата должна быть непустой строкой.');
    }
    this._date = dateStr;
  }

  get date() {
    return this._date;
  }

  /**
   * Устанавливает исходный формат даты.
   * @param {string[]} formatArr
   *     - Массив формата, например, ['YYYY', 'MM', 'DD', '-'].
   */
  set fromFormat(formatArr) {
    this._fromFormat = formatArr;
  }

  get fromFormat() {
    return this._fromFormat;
  }

  /**
   * Устанавливает целевой формат даты.
   * @param {string[]} formatArr
   *     - Массив формата, например, ['DD', 'MM', 'YYYY', '.'].
   */
  set toFormat(formatArr) {
    this._toFormat = formatArr;
  }

  get toFormat() {
    return this._toFormat;
  }

  // --- ПРИВАТНЫЕ МЕТОДЫ ---

  /**
   * Разбирает исходную строку даты на компоненты.
   * @private
   */
  _parse() {
    const separator = this._fromFormat[3];
    const dateParts = this._date.split(separator);
    const formatParts = this._fromFormat.slice(0, 3);

    formatParts.forEach((formatComponent, index) => {
      const dateValue = dateParts[index];

      // Сохраняем оригинальное значение и его тип
      this._parsedData[formatComponent] = dateValue;
    });
  }

  /**
   * Собирает новую строку даты из разобранных компонентов.
   * @returns {string} - Отформатированная строка даты.
   * @private
   */
  _assemble() {
    const newSeparator = this._toFormat[3];
    const newFormatParts = this._toFormat.slice(0, 3);

    const resultParts = newFormatParts.map((targetFormatComponent) => {
      // Находим исходный тип компонента (например, для 'DD' это будет 'DD')
      const sourceComponentKey = Object.keys(this._parsedData).find(
        // YYYY/YY -> Y, MM -> M, DD -> D
        (key) => key.includes(targetFormatComponent.slice(0, 1)),
      );

      const sourceValue = this._parsedData[sourceComponentKey];
      const handler = componentHandlers[sourceComponentKey];

      // Трансформируем значение, если это необходимо (например, YYYY -> YY)
      return handler.transform(sourceValue, targetFormatComponent);
    });

    return resultParts.join(newSeparator);
  }

  // --- ПУБЛИЧНЫЙ МЕТОД ---

  /**
   * Выполняет форматирование.
   * @returns {string} - Новая строка с датой.
   */
  format() {
    this._parse();

    return this._assemble();
  }
}

/**
 * Функция-обертка для удобного использования.
 * @param {string} date - Исходная строка даты.
 * @param {string[]} fromFormat - Исходный массив формата.
 * @param {string[]} toFormat - Целевой массив формата.
 * @returns {string} - Отформатированная строка даты.
 */
function formatDate(date, fromFormat, toFormat) {
  const formatter = new DateFormatter();

  formatter.date = date;
  formatter.fromFormat = fromFormat;
  formatter.toFormat = toFormat;

  return formatter.format();
}

module.exports = formatDate;
