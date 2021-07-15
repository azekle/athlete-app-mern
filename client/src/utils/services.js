import {requests} from './axios'

export const isAuthenticated = async () => (await requests.get("/")).status === 201
