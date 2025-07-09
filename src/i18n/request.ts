import { LANGUAGE_COOKIE } from "@/lib/constants"
import { LanguagesList } from "@/lib/lists"

import { getRequestConfig } from "next-intl/server"
import { cookies } from "next/headers"

export default getRequestConfig(async () => {
  const store = await cookies()
  const language = store.get(LANGUAGE_COOKIE)?.value || "en"
  const locale = LanguagesList.includes(language) ? language : "en"

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
