// Builds the site into dist/: compiles SASS (compressed) and copies the
// HTML, JavaScript and images.
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import * as sass from 'sass'

rmSync('dist', { recursive: true, force: true })
mkdirSync('dist/css', { recursive: true })

const { css } = sass.compile('scss/main.scss', { style: 'compressed' })
writeFileSync('dist/css/main.css', css)

for (const path of ['index.html', 'js', 'images']) {
  cpSync(path, `dist/${path}`, { recursive: true })
}

console.log(`Built dist/ (CSS ${(css.length / 1024).toFixed(1)} kB)`)
