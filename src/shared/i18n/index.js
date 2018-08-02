import Polyglot from 'node-polyglot'
import language from 'shared/language'
import sourceFile from './source_file.json'

const languageDefault = 'en_GB'

function tryRequire(path) {
  try {
    // eslint-disable-next-line
    return require(`${path}`)
  } catch (err) {
    return null
  }
}

const polyglot = new Polyglot({
  locale: language,
  phrases: tryRequire(`./translations/${language}`) || sourceFile,
})

function getTranslations(lang) {
  try {
    const json = lang === languageDefault
      ? tryRequire('./source_file.json')
      : tryRequire(`./translations/${lang}`)

    return json
  } catch (error) {
    return null
  }
}

function setPolyglot(lang) {
  localStorage.setItem('language', lang)
  const json = getTranslations(lang) || sourceFile
  polyglot.extend(json)
  polyglot.locale(lang)
}

export default {
  languageDefault,
  languageCurrent: language,
  setPolyglot,
  getTranslations,
  t: polyglot.t.bind(polyglot),
}
