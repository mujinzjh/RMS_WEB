interface apiInterface {
  [propname: string]: any
}

const API: apiInterface = {
  'loginUrl': {
    url: '/login',
    method: 'post'
  }
}

export default API;