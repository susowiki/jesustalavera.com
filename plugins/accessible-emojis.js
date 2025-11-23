import EmojiRegex from 'emoji-regex'

const emojiRegex = EmojiRegex()
const EMOJI_LABELS = {
  10084: 'Red heart',
  127881: 'Party popper',
  128546: 'Crying face',
  128562: 'Astonished Face',
  128073: 'Hand pointing right',
  128075: 'Waving hand',
  128077: 'Thumbs up',
  128207: 'Straight ruler',
  128522: 'Smyling face',
  129315: 'Rolling on the Floor Laughing Emoji'
}

export function makeEmojisAccessible (text) {
  return text && text.replace(
    emojiRegex,
    (emoji) => {
      const emojiCodePoint = emoji.codePointAt(0)
      const label = EMOJI_LABELS[emojiCodePoint]

      if (!label) {
        console.warn(`Label for CodePoint ${emojiCodePoint} is not defined`)
      }

      return `<span role="img" aria-label="${EMOJI_LABELS[emoji.codePointAt(0)]}" tabindex="0">${emoji}</span>`
    }
  )
}
