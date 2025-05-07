import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/'

const AxiosInstance = axios.create({
    baseURL: baseUrl, // عنوان الخادم الأساسي (API)
    timeout: 5000, // المهلة الزمنية للطلب (5 ثوانٍ)
    headers:{
        "Content-Type": "application/json", // نوع البيانات المرسلة
        accept: "application/json" // نوع البيانات المقبولة من الخادم
    }
})

export default AxiosInstance;