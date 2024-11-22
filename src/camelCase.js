function snakeToCamel(key) {
  let flag = false
  let result = ''
  key.split('').forEach(i => {
    if (flag) {
      result += i.toUpperCase()
      flag = false
    } else if (i === '_') {
      flag = true
    } else {
      result += i
    }
  })
  return result
}

function toCamelCase(obj) {
  const result = {}
  Object.keys(obj).forEach(key => {
    result[snakeToCamel(key)] = obj[key]
  })
  return result
}

export default toCamelCase
