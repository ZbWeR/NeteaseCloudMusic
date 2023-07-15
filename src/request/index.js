import axios from "axios";

let service = axios.create({
    // baseURL: 'http://123.249.120.189:3000',
    baseURL: 'https://netease-cloud-music-api-roan-five.vercel.app/',
    timeout: 5000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
})

export default service;