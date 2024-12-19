const cheerio = require('cheerio')
const url = require('url')

const javascriptExtractor = async (targetUrl, headers) => {
  const parsedUrl = targetUrl.startsWith('http')
    ? targetUrl
    : `https://${targetUrl}`
  const parsedHeaders = parseHeaders(headers)
  const response = await fetch(parsedUrl, {
    headers: parsedHeaders
  })
  const html = await response.text()
  const $ = cheerio.load(html)
  const scripts = []
  $('script').each((_, element) => {
    const src = $(element).attr('src')
    if (src && src.endsWith('.js')) {
        const fullUrl = url.resolve(parsedUrl, src)
        scripts.push(fullUrl)
    }
  })
  return scripts
}

const parseHeaders = (headers = []) => {
  return headers.reduce((obj, item) => {
    const [key, value] = item.split(':').map(text => text.trim())
    obj[key] = value
    return obj
  }, {})
}

module.exports = {
  javascriptExtractor
}
