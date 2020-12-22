const NODE_ENV = 'production'
// const NODE_ENV = 'testing'

const ev = {}
if( NODE_ENV === 'testing' ){
  ev.BackEnd_URL = 'http://localhost:5000'
  ev.AxiosConfigWithCredential = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true,
    origin: 'localhost:3000',
  }
} else if( NODE_ENV === 'production' ){
  ev.BackEnd_URL = ''
  ev.AxiosConfigWithCredential = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true,
  }
}

export const Environment_variable = ev