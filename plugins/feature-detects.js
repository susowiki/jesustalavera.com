let webpIsSupported = null

const checkWebpSupport = () => {
  return new Promise((resolve) => {
    // taken from https://github.com/Modernizr/Modernizr/blob/master/feature-detects/img/webp.js
    const image = new Image()
    const uri = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA='

    function addResult (event) {
      const result = event && event.type === 'load' ? image.width === 1 : false
      resolve(result)
    }

    image.onerror = addResult
    image.onload = addResult

    image.src = uri
  })
}

export const supportsWebp = () => {
  if (webpIsSupported === null) {
    return checkWebpSupport()
      .then(result => {
        webpIsSupported = result
        return webpIsSupported
      })
  } else {
    return Promise.resolve(webpIsSupported)
  }
}
