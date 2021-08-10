import axios from 'axios'

export const requests = axios.create({
    baseURL: "http://192.168.100.39:9000/api/v1",
    timeout: 1000,
    headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))},
  });