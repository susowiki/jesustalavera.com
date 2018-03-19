const WORDS_PER_MIN = 275

export default entry => {
  let count = 0

  if (entry.fields.body) {
    count = entry.fields.body.match(/\w+/g).length
  }

  if (entry.fields.tilPosts && entry.fields.tilPosts.length) {
    count += entry.fields.tilPosts.reduce((acc, post) => {
      return acc + post.fields.body.match(/\w+/g).length
    }, count)
  }

  return Math.ceil(count / WORDS_PER_MIN)
}
