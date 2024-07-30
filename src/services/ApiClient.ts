import { AxiosRequestConfig } from "axios";
import httpService from "./httpService";

export default class ApiClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  post = (data: T, config?: AxiosRequestConfig) =>
    httpService.post(this.endpoint, data, config);
}
