/*
Criteria
(3): colType + formatCurrency
(4): All above + COLUMN_TYPE + sortBy
(5): All above + groupBy
(6): All above +  enumerateData
 */

/**
 * @constant {*} constants - value cannot be changed
 * @property {string} TEXT - value is 'text'; cannot be changed
 * @property {string} NUMBER - value is 'number'; cannot be changed
 * @property {string} BOOLEAN - value is 'boolean'; cannot be changed
 * @property {string} DATE - value is 'date'; cannot be changed
 * @property {string} TIME - value is 'time'; cannot be changed
 * @property {string} TIMESPAN - value is 'timespan'; cannot be changed
 * @property {string} CHECKBOX - value is 'checkbox'; cannot be changed
 * @property {string} ENUM - value is 'enum'; cannot be changed
 * @property {string} CURRENCY - value is 'currency'; cannot be changed
 * @returns Returns column types as properties. Their values cannot be changed.
 */
export const COLUMN_TYPE = {
    TEXT: 'text',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    DATE: 'date',
    TIME: 'time',
    TIMESPAN: 'timespan',
    CHECKBOX: 'checkbox',
    STATUS: 'status',
    ENUM: 'enum',
    CURRENCY: 'currency'
};

/**
 * 
 * @param {any} c - value
 * @param {string} item - 
 * @returns Returns dynamic type, which means type of the variable 'item' is based on the value assigned to at run time. Or it returns type of 'c'.
 */
export const colType = (c, item) => c.dynamicType?.(item) || c.type;

/**
 * 
 * @param {number} value - currency value
 * @returns Returns value formatted into string => "{number}$"
 */
export const formatCurrency = (value) => "$" + value.toString();

/**
 * External function
 * @param {number} value
 * @returns {*} formatted time string
 */
const formatTime = value => value;

/**
 * External function
 * @param {number} value
 * @returns {*} formatted TimeSpan string
 */
const formatTimeSpan = value => value;

/**
 * External function
 * @param value
 * @returns {*} formatted Date object
 */
const formatDate = value => value;

/**
 * @function sortBy
 * @param {object[]} array of objects
 * @param {string[]} keys
 * @param {boolean} asc - how objects to be sorted
 * @param {undefined} valueFormatter {function}
 * @param {boolean|undefined} ifCallback {function}
 * @returns Returns a copy of section of the array sorted by asc. After that comparator compare the values of the objects
 */
export function sortBy(array, keys, asc = true, valueFormatter = undefined, ifCallback = undefined) {
    return array.slice().sort((a, b) => comparator(a, b, keys, asc, valueFormatter, ifCallback));
}

/**
 * 
 * @param {number|string} col
 * @param {any} item - value of any type
 * @returns Returns value of the cell of item formatted in different column types
 */
export function formatCellContent(col, item) {
    let formattedValue = col.key ? item[col.key] : item;

    if (col.format)
        formattedValue = col.format(item, col.key,);

    if (typeof formattedValue === 'number')
        switch (col.type) {
            case COLUMN_TYPE.TIME:
                formattedValue = formatTime(formattedValue); break;
            case COLUMN_TYPE.TIMESPAN:
                formattedValue = formatTimeSpan(formattedValue); break;
            case COLUMN_TYPE.DATE:
                formattedValue = formatDate(formattedValue); break;
            case COLUMN_TYPE.CURRENCY:
                formattedValue = formatCurrency(formattedValue); break;
        }
    else if (col.type == COLUMN_TYPE.STATUS)
        formattedValue = col.template(item);

    return formattedValue;
}

/**
 * @function groupBy - groups list by key (index)
 * @param {any} list
 * @param {number} key
 * @returns Returns array 'res' with new lenght because of push method which adds one or more elements to the end. 
 */
export function groupBy(list, key) {
    return list.reduce((res, x) => {
        (res[x[key]] = res[x[key]] || []).push(x);
        return res;
    }, {});
}

/**
 * @function enumerateData
 * @param {any} data
 * @param {string} propertyName
 * @returns Returns HTML list of data items which values are not required to change. There is a choice item to be clicked. 
 */
export function enumerateData(data, propertyName) {

    if (!data || !Array.isArray(data))
        throw new Error("Data parameter should be array")

    const list = document.createElement('ul');

    for (let i = 0; i < data.length; i++) {
        const li = document.createElement('li');
        const clickEvent = new CustomEvent('item_selected', { item: data[i] })

        li.innerText = data[i][propertyName] || '';
        li.addEventListener('click', (e) => li.dispatchEvent(clickEvent))

        list.appendChild(li);
    }

    return list;
}


/**
 * External function. Do not put documentation on this.
 * @param a {any}
 * @param b {any}
 * @param keys {string[]}
 * @param asc {boolean}
 * @param valueFormatter {function}
 * @param ifCallback {function}
 * @returns {boolean}
 */
function comparator(a, b, keys, asc, valueFormatter, ifCallback) {
}
