// export const HOST = 'http://localhost:3000'
export const HOST = 'http://46.101.233.195:3000'

export const CATEGORIES_URL = '/categories'

export const COLORS_URL = '/colors'

export const PRODUCTS_URL = '/products'

export const SHAPES_URL = '/shapes'

export const SIZES_URL = '/sizes'

export const STYLES_URL = '/styles'

export const SHOP_INFO_URL = '/shop-info'

export const WEAVES_URL = '/weaves'

export const ADMIN_URL = '/admin'

export const LOGIN_URL = '/login'

export const VALIDATE_TOKEN_URL = '/validate-token'

export const HOME_URL = '/'

export const PUT = (url, body) => { return PUT_POST_DELETE('PUT', url, body) }

export const POST = (url, body) => { return PUT_POST_DELETE('POST', url, body) }

export const DELETE = (url, id) => { return PUT_POST_DELETE('DELETE', url + '/' + id, {}) }

export const GET = (url) => {
  return new Promise((resolve, reject) => {
    window.fetch(endPoint + url)
      .then(res => { return toJSON(res) })
      .then(json => resolve(json))
      .catch(err => reject(err))
  })
}

const endPoint = HOST + '/api'

const PUT_POST_DELETE = (method, url, body) => {
  body.token = window.sessionStorage.getItem('rrcToken')
  return new Promise((resolve, reject) => {
    window.fetch(endPoint + url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(res => { return toJSON(res) })
      .then(json => resolve(json))
      .catch(err => reject(err))
  })
}

const toJSON = (res) => {
  return new Promise((resolve, reject) => {
    res.json()
      .then(json => res.ok ? resolve(json) : reject(json, res.status))
      .catch(err => reject(err))
  })
}
