'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  // Crinado copias para não modificar o array original
  const formatFrom = [...fromFormat];
  const formatTo = [...toFormat];

  // Removendo o separador e atribuindo separado do arrayCopy
  const fromSep = formatFrom.pop();
  const toSep = formatTo.pop();

  // transformando a string em array para realizar a validação dos dados
  const parts = date.split(fromSep);

  const dateMap = [];

  /**
   1. Criaremos um objeto para saber o que cada parte da data original
   representa
   */

  const sourceValues = {};

  formatFrom.forEach((key, i) => {
    sourceValues[key] = parts[i];
  });
  // sourceValues = { DD: '20', MM: '02', YY: '18' }

  // 2. Montando o dateMap seguindo a ordem pedida no toFormat
  formatTo.forEach((targetKey) => {
    let value;

    /**
     Procura a chave correspondente no formato original e realizando
     a formatação do valor correspondente ao formato original
     */
    for (const sourceKey in sourceValues) {
      const originalValue = sourceValues[sourceKey];

      if (sourceKey === targetKey) {
        // chave correspondente
        value = originalValue;
      } else if (targetKey === 'YYYY' && sourceKey === 'YY') {
        const yearNum = parseInt(originalValue, 10);
        // De YY (18) para YYYY (2018)
        const prefix = yearNum >= 30 ? '19' : '20';

        value = `${prefix}${originalValue}`;
      } else if (targetKey === 'YY' && sourceKey === 'YYYY') {
        // De YYYY (2018) para YY (18)
        value = originalValue.slice(-2);
      }
    }

    // Alocando o valor dentro do meu array de retorno
    dateMap.push(value);
  });

  return dateMap.join(toSep);
}

module.exports = formatDate;
