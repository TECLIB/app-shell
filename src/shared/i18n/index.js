import Polyglot from 'node-polyglot'
import language from '../language'
import sourceFile from './source_file.json'

const languageDefault = 'en_GB'

let polyglot = new Polyglot({
  locale: language,
  phrases: sourceFile,
})

function tryRequire(path) {
  try {
    // eslint-disable-next-line
    return require(`${path}`);
  } catch (err) {
    return null;
  }
}

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
  polyglot = new Polyglot({
    locale: lang,
    phrases: json,
  })
}

export default {
  languageDefault,
  languageCurrent: language,
  setPolyglot,
  t: polyglot.t.bind(polyglot),
}
