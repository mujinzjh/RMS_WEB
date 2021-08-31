import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import Constants from '../utils/Constants';
// const cancelToken: CancelTokenStatic = axios.CancelToken;
// const source: CancelTokenSource = cancelToken.source();


// 使用请求拦截器
axios.interceptors.request.use((config: any) => {
  return config;
}, (err: any) => {
  return Promise.reject(err);
});

//使用响应拦截器
axios.interceptors.response.use((res: AxiosResponse<any>) => {
  return res;
}, (err: any) => {
  return Promise.resolve(err);
});

const isParamsVaild = (params: any): boolean => {
  return Boolean(params.method && params.url);
}

const handleHeader = (opts: any) => {
  var defalutHeader;
  if (opts.header) {
    defalutHeader = opts.header;
  } else if (opts.method.toUpperCase() === "GET") {
    defalutHeader = {
      'X-Request-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    };
  } else {
    defalutHeader = {
      'X-Request-With': 'XMLHttpRequest',
      'Content-Type': 'application/json;charset=UTF-8'
    };
  }
  return defalutHeader;
}




// const getHeader = (key: any) => {
//   return axios.defaults.headers.common[key];
// }

// const setHeader = (key: any, value: any, type: any) => {
//   if (!type) {
//     axios.defaults.headers.common[key] = value;
//   } else {
//     axios.defaults.headers[type][key] = value;
//   }
// }
interface objectInterface {
  [propname: string]: any
}
const handleOptions = (opts: any, baseURL: string, data: any) => {
  let publicParams: object = {},
    defaultHeader = handleHeader(opts),
    httpDefaultOpts: objectInterface = {
      method: opts.method,
      baseURL,
      timeout: opts.timeout || 10000,
      headers: defaultHeader,
      onUploadProgress: opts.onUploadProgress || function () { },
      CancelToken: opts.cancel || '',
      responseType: opts.responseType || ''
    };
  if (opts.method.toUpperCase() === 'GET' || opts.method.toUpperCase() === 'DELETE') {
    httpDefaultOpts.params = Object.assign(publicParams, data);
  } else {
    httpDefaultOpts.data = handleParamData(defaultHeader, data);
  }
  return httpDefaultOpts;
}
const handleParamData = (defaultHeader: any, data: any) => {
  return defaultHeader && defaultHeader['Content-Type'] === 'applicaation/x-www-form-urlencoded' ? qs.stringify(data) : data;
}
const axiosHttpUtil = (opts: any, data: any): Promise<unknown> => {
  let baseURL: string = opts.baseURL || Constants.baseURL, promise;

  const httpDefaultOpts = handleOptions(opts, baseURL, data);

  promise = new Promise((resolve, reject) => {
    if (!isParamsVaild(opts)) {
      reject({
        data: {
          rtnMsg: '本地参数错误',
          result: false
        }
      })
    }
    axios(httpDefaultOpts).then(res => {
      if ((!res || String(res.status) === '500' || !res.data) && String(res && res.status) !== '404') {
        resolve({
          data: {
            rtnMsg: '网络或服务器错误，请重试！',
            result: false,
          }
        }
        )
      } else {
        resolve(res);
      }
    }).catch(err => {
      reject(err);
    })
  });
  return promise;
}

export default axiosHttpUtil;