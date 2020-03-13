// @ts-nocheck
import axios from "axios";
import { Toast } from "vant";
import router from "../router";


axios.defaults.baseURL = process.env.VUE_APP_URL;
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

var toast;

axios.interceptors.request.use(
  config => {
    toast = Toast.loading({
      duration: 0,
      mask: true,
      message: '加载中...'
    })

    const loading = parseInt(localStorage.getItem('loading')) + 1;
    localStorage.setItem('loading', loading);

    if (localStorage.getItem('token')) {
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    }

    return config;
  }
)

axios.interceptors.response.use(
  res => {
    const loading = parseInt(localStorage.getItem('loading')) - 1;
    localStorage.setItem('loading', loading);

    if (!loading) {
      setTimeout(() => {
        toast.clear()
      }, 360);
    }

    return res
  },
  err => {
    if (err.response.status == 504 || err.response.status == 404) {
      Toast('请求不存在');
    } else if (err.response.status == 403) {
      Toast(err.response.data.msg);
    } else if (err.response.status == 401) {
      localStorage.removeItem('token')
      router.push({ path: "/login" })
    } else {
      Toast('未知错误');
    }
    return Promise.reject(err.response);
  }
)

function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });
}

function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });
}

function put(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });
}

function file(url, params) {
  return new Promise((resolve, reject) => {
    let data = new FormData();
    data.append('file', params.file)
    data.append('name', params.name)

    axios.post(url, data).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });
}

export default {
  get,
  put,
  post,
  file
}