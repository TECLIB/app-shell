/*
 *  LICENSE
 *
 *  This file is part of app-shell
 *
 *  app-shell is a subproject of Teclib.
 *
 *  app-shell is free software: you can redistribute it and/or
 *  modify it under the terms of the GNU General Public License
 *  as published by the Free Software Foundation; either version 3
 *  of the License, or (at your option) any later version.
 *
 *  app-shell is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  ------------------------------------------------------------------------------
 *  @author     Hector Rondon (hrondon@teclib.com)
 *  @copyright  Copyright © 2018 Teclib. All rights reserved.
 *  @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
 *  @link       https://github.com/TECLIB/app-shell
 *  @link       https://teclib.github.io/app-shell
 *  @link       https://teclib-edition.com/en
 *  ------------------------------------------------------------------------------
 */

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
