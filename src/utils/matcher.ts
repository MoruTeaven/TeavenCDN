import { JsDelivrFile } from '../services/jsdelivr'

const ENTRY_DIRS = ['dist/', 'umd/', 'browser/', 'build/', 'lib/', 'release/', 'out/', 'pkg/', 'bundles/']

export function findEntryFile(name: string, files: JsDelivrFile[], defaultFile?: string): string | null {
  if (defaultFile) {
    const df = files.find(f => f.name === defaultFile)
    if (df) {
      return defaultFile
    }
    if (/\.(js|mjs|cjs)$/.test(defaultFile)) {
      return defaultFile
    }
  }

  const jsFiles = files.filter(f => /\.js$/.test(f.name) || /\.mjs$/.test(f.name) || /\.cjs$/.test(f.name))

  for (const suffix of ['.min.js', '.min.mjs', '.min.cjs']) {
    const min = jsFiles.find(f => f.name.endsWith(suffix))
    if (min) return min.name
  }

  for (const dir of ENTRY_DIRS) {
    for (const suffix of ['.min.js', '.min.mjs', '.min.cjs']) {
      const found = jsFiles.find(f => f.name.startsWith(dir) && f.name.endsWith(suffix))
      if (found) return found.name
    }
  }

  for (const dir of ENTRY_DIRS) {
    const found = jsFiles.find(f => f.name.startsWith(dir))
    if (found) return found.name
  }

  if (jsFiles.length > 0) return jsFiles[0].name

  return null
}
