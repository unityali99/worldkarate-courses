import { AxiosRequestConfig } from "axios";
import httpService from "./httpService";

export default class ApiClient<T> {
  private endpoint: string;
  private config?: AxiosRequestConfig;

  constructor(endpoint: string, config?: AxiosRequestConfig) {
    this.endpoint = endpoint;
    this.config = config;
  }

  static logout = () => httpService.post("/logout");

  get = () => httpService.get<T>(this.endpoint, this.config);

  post = (data: T) => httpService.post(this.endpoint, data, this.config);

  put = (data: T) => httpService.put(this.endpoint, data, this.config);
}
