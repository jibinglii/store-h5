import crypto from 'crypto'

const md5 = (str) => {
  let md5 = crypto.createHash("md5");
  md5.update(str);
  let a = md5.digest('hex');
  return a
}

import http from '$utils/http'
export default {
  async getUserInfo(loading) {
    let load = loading || false;
    return await http.get('api/v1/auth/me', { loading: load })
  },
  async setPayPasswd(pwd, loading) {
    let load = loading || false;
    return await http.post('api/v1/user/set-pay-password', { password: md5(pwd) }, { loading: load })
  },
  async veryPPwd(pwd, loading) {
    let load = loading || false;
    return await http.post('api/v1/user/verify-password', { password: md5(pwd) }, { loading: load })
  },
  async modifyPPwd(old_pwd, pwd, loading) {
    let load = loading || false;
    return await http.post('api/v1/user/modify-password', { password: md5(old_pwd), new_pass: md5(pwd) }, { loading: load })
  },
  async getAuthStatus() {
    return await http.get('api/v1/user/store/auth/status', { loading: true })
  },
  async login(mobile, password) {
    let params = {
      username: mobile,
      password: password,
      client_id: process.env.MIX_CLIENTID,
      client_secret: process.env.NODE_ENV == 'production' ? process.env.MIX_CLIENT_SECRET : process.env.MIX_CLIENT_SECRET_DEV,
      scope: process.env.MIX_SCOPE,
      grant_type: 'password'
    };
    return await http.post('api/v1/auth/login', params, { loading: true })
  },
  async loginByCode(mobile, code) {
    let params = {
      mobile: mobile,
      code: code,
      client_id: process.env.MIX_CLIENTID
    };
    return await http.post('api/v1/user/login-by-code', params, { loading: true })
  }
}
