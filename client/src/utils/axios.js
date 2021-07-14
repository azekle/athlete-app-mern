import axios from 'axios'

export const instance = axios.create({
    baseURL: "http://localhost:9000/api/v1",
    timeout: 1000,
    headers: {'Authorization' : 'Bearer ' + localStorage.getItem('token'),}
  });