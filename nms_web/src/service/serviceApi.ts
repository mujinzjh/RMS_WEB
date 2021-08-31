interface apiInterface {
  [propname: string]: any
}

const API: apiInterface = {
  login: {
    url: '/login',
    method: 'post'
  }
}

export default API;