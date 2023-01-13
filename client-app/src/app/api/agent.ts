import axios, { AxiosResponse } from "axios";
import { Cita } from "../models/cita";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T> (url: string) => axios.get<T>(url).then(responseBody),
  post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Citas = {
  list: () => requests.get<Cita[]>('/citas'),
  details: (id: string) => requests.get<Cita>(`/citas/${id}`),
  create: (cita: Cita) => axios.post<void>('/citas', cita),
  update: (cita: Cita) => axios.put<void>(`/citas/${cita.id}`, cita),
  delete: (id: string) => axios.delete<void>(`/citas/${id}`)
}

const agent = {
  Citas
}

export default agent;