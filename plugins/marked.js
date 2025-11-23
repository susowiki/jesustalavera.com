import { marked } from 'marked'
import Prism from 'prismjs'
import { makeEmojisAccessible } from './accessible-emojis.js'

const renderer = new marked.Renderer()

renderer.code = (code, language) => {
  return `<pre class="o-code o-code-${language || 'whatevs'}"><code>${language ? Prism.highlight(code, Prism.languages[language]) : code
    }</code></pre>`
}

renderer.heading = function (text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')

  return `
    <h${level} class="o-anchorContainer" id="${escapedText}">
      <a href="#${escapedText}" aria-label="Anchor link for '${text}'">#</a>
      ${makeEmojisAccessible(text)}
    </h${level}>
  `
}

renderer.image = (href, title, text) => {
  if (/\.mp4$/.test(href)) {
    return `
      <video controls preload="metadata">
        <source src="${href}" type="video/mp4">
      </video>
    `
  }

  return `<img src="${href}" alt="${text}">`
}

renderer.paragraph = text => `<p>${makeEmojisAccessible(text)}</p>\n`

export default function (text) {
  return text
    ? marked.parse(text, { renderer })
    : ''
}
