// Quick checks that the SASS compiles and the HTML keeps some
// accessibility and SEO basics. Run with: npm test
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { JSDOM } from 'jsdom'
import * as sass from 'sass'

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const { document } = new JSDOM(html).window

test('SASS compiles without errors', () => {
  const { css } = sass.compile('scss/main.scss')
  assert.ok(css.includes('.hero__inner'))
})

test('page has a language, title, description and canonical link', () => {
  assert.equal(document.documentElement.lang, 'en-GB')
  assert.ok(document.title.length > 10)
  assert.ok(document.querySelector('meta[name="description"]').content.length > 50)
  assert.ok(document.querySelector('link[rel="canonical"]'))
  assert.ok(document.querySelector('meta[property="og:title"]'))
})

test('there is exactly one h1 and heading levels are not skipped', () => {
  const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')]
  assert.equal(headings.filter((h) => h.tagName === 'H1').length, 1)
  let previous = 1
  for (const heading of headings) {
    const level = Number(heading.tagName[1])
    assert.ok(level <= previous + 1, `"${heading.textContent}" skips a heading level`)
    previous = level
  }
})

test('every form field has a label', () => {
  for (const field of document.querySelectorAll('input, select, textarea')) {
    const label = document.querySelector(`label[for="${field.id}"]`)
    assert.ok(label, `#${field.id} has no label`)
  }
})

test('every in-page link points at an element that exists', () => {
  for (const link of document.querySelectorAll('a[href^="#"]')) {
    const id = link.getAttribute('href').slice(1)
    assert.ok(document.getElementById(id), `${link.getAttribute('href')} has no target`)
  }
})

test('SVGs are either hidden from screen readers or labelled', () => {
  for (const svg of document.querySelectorAll('svg')) {
    const hidden = svg.getAttribute('aria-hidden') === 'true'
    const labelled = svg.getAttribute('role') === 'img' && svg.getAttribute('aria-label')
    assert.ok(hidden || labelled)
  }
})
