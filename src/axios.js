import axios from "axios";

export const http = axios.create({
    baseURL:"https://strapi-store-server.onrender.com/api"
})