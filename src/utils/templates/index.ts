import { api } from './api'
import { app } from './app'
import { component } from './component'
import { composable } from './composable'
import { error } from './error'
import { layout } from './layout'
import { middleware } from './middleware'
import { page } from './page'
import { plugin } from './plugin'
import { serverMiddleware } from './server-middleware'

const templates: Record<string, Template> = {
  api,
  app,
  component,
  composable,
  error,
  layout,
  middleware,
  page,
  plugin,
  'server-middleware': serverMiddleware,
}

function applySuffix(
  args: TemplateOptions['args'],
  suffixes: string[],
  unwrapFrom?: string,
): string {
  let suffix = ''

  // --client
  for (const s of suffixes) {
    if (args[s]) {
      suffix += '.' + s
    }
  }

  // --mode=server
  if (unwrapFrom && args[unwrapFrom] && suffixes.includes(args[unwrapFrom])) {
    suffix += '.' + args[unwrapFrom]
  }

  return suffix
}

type TemplateOptions = {
  name: string
  args: Record<string, any>
}

type Template = {
  (options: TemplateOptions): { path: string; contents: string }
}

export { templates, applySuffix, TemplateOptions, Template }