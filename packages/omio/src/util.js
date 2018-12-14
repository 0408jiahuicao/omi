/**
 *  Copy all properties from `props` onto `obj`.
 *  @param {Object} obj		Object onto which properties should be copied.
 *  @param {Object} props	Object from which to copy properties.
 *  @returns obj
 *  @private
 */
export function extend(obj, props) {
  for (let i in props) obj[i] = props[i]
  return obj
}

/**
 * Call a function asynchronously, as soon as possible. Makes
 * use of HTML Promise to schedule the callback if available,
 * otherwise falling back to `setTimeout` (mainly for IE<11).
 *
 * @param {Function} callback
 */

let usePromise = typeof Promise == 'function'

// for native
if (
  typeof document !== 'object' &&
  typeof global !== 'undefined' &&
  global.__config__
) {
  if (global.__config__.platform === 'android') {
    usePromise = true
  } else {
    let systemVersion =
      (global.__config__.systemVersion &&
        global.__config__.systemVersion.split('.')[0]) ||
      0
    if (systemVersion > 8) {
      usePromise = true
    }
  }
}

export const defer = usePromise
  ? Promise.resolve().then.bind(Promise.resolve())
  : setTimeout

  export function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  }
  
  export function nProps(props) {
    if (!props || isArray(props)) return {}
    const result = {}
    Object.keys(props).forEach(key => {
      result[key] = props[key].value
    })
    return result
  }