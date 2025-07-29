// import axios from "axios";
// const axiosInstance=axios.create({
//     baseURL:'http://localhost:3000'
// })
// axiosInstance.interceptors.request.use(function (config) {
//     const accessToken=localStorage.getItem('logintoken');
    
//     if(accessToken){
//         if(config){
//             config.headers.token=accessToken;
//         }
//     }
//     // Do something before request is sent
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });
//   export default axiosInstance


import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

// ✅ Attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
