const i18n = require('i18n')
const path = require('path')
exports.i18nInit = async () => {
  i18n.configure({
    locales: ['en', 'hi'],
    directory: path.join(__dirname, '../resources/locale')
  })
}

exports.convertMessage = async (key, locale, paramList = []) => {
  const jsonKeys = {}
  for (const [index, param] of paramList.entries()) {
    jsonKeys[index] = param
  }
  i18n.setLocale(locale)
  return i18n.__(key, jsonKeys)
}
