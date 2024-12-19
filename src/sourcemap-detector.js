const sourcemapDetector = async (scriptUrl, headers) => {
  const parsedHeaders = parseHeaders(headers)
  const response = await fetch(scriptUrl, {
    headers: parsedHeaders
  })
  const js = await response.text()
  const sourcemapRegex = /\/\/# sourceMappingURL=.+\.map$/;
  return sourcemapRegex.test(js);
}

const parseHeaders = (headers = []) => {
  return headers.reduce((obj, item) => {
    const [key, value] = item.split(':').map(text => text.trim())
    obj[key] = value
    return obj
  }, {})
}

module.exports = {
  sourcemapDetector
}
