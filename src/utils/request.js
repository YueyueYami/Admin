import axios from 'axios'
import dev from '../utils/dev'
import { Message } from 'element-ui'
// import router from '@/router/index'
const https = axios.create({
    baseURL: dev.prod.baseURL,
    timeout: 50000
})
https.interceptors.request.use(
    (config) => {
        if (config.url != '/') {
            const token = window.sessionStorage.getItem('token')
            config.headers.Authorization = token
        }
        return config
    }, (err) => {
        alert(err)
    }
)
https.interceptors.response.use(
    (response) => {
        if (response.data.meta.msg == '无效token') {
            window.sessionStorage.removeItem('token')
            window.location.href = '/'
        }
        const status = [200, 201, 204]
        if (status.includes(response.data.meta.status)) {
            Message({
                message: response.data.meta.msg,
                type: 'success',
                duration: 500,
                offset: 30
            })
        } else {
            Message({
                message: response.data.meta.msg,
                type: 'error'
            })
        }
        if (response.config.url === '/login') {
            sessionStorage.setItem('token', response.data.data.token)
        }
        return response
    }, (err) => {
        alert(err)
    }
)
export default https