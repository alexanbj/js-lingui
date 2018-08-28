import * as React from "react"

import { I18nProvider, Trans, i18nMark } from "@lingui/react"
import RenderPropBug from './RenderPropBug';


const languages = {
  en: i18nMark("English"),
  cs: i18nMark("Czech"),
  fr: i18nMark("French")
}

class App extends React.Component {
  state = {
    language: "en",
    catalogs: {}
  }

  loadLanguage = async language => {
    /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
    const catalogs = await import(`./locale/${language}/messages.json`)

    this.setState(state => ({
      catalogs: {
        ...state.catalogs,
        [language]: catalogs
      }
    }))
  }

  componentDidMount() {
    this.loadLanguage(this.state.language)
  }

  shouldComponentUpdate(nextProps, { language, catalogs }) {
    if (language !== this.state.language && !catalogs[language]) {
      this.loadLanguage(language)
      return false
    }

    return true
  }

  render() {
    const { language, catalogs, languageData } = this.state

    if (!catalogs[language]) return null

    return (
      <div>
        <I18nProvider
          language={language}
          catalogs={catalogs}
          languageData={languageData}
        >
        <RenderPropBug />
        </I18nProvider>
      </div>
    )
  }
}

export default App
