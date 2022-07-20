import axios from 'axios'
import dev from '../utils/dev'
import { Message } from 'element-ui'
const https = axios.create({
    baseURL: dev.prod.baseURL,
    timeout: 5000
})
https.interceptors.request.use(
    (config) => {
        console.log(config);
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
        const status = [200, 201, 204]
        // console.log(response.data)
        if (status.includes(response.data.meta.status)) {
            Message({
                message: response.data.meta.msg,
                type: 'success'
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
        console.log(err)
        alert(err)
    }
)
export default https