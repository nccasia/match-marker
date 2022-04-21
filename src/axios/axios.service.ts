import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosRequestConfig, Method } from "axios";

interface UrlI {
  email?: string
  id?: number
}
@Injectable()
export class AxiosService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async fetchApi<T>(url: string, method: Method, body?: any, headers?: any, content_type?: any) {
    let apiHeader = headers;
    if (content_type) {
      apiHeader = {...apiHeader, 'Content-Type': content_type}
    }else {
      apiHeader = {...apiHeader, 'Content-Type': 'application/json'}
    }

    let data = {}

    if (body) {
      data = {
        data: body
      }
    }

    let requestHttp: AxiosRequestConfig = {
      url,
      method,
      headers: apiHeader,
      ...data
    }

    try {
      return await this.httpService.request<T>(requestHttp).toPromise();
    }catch (e) {
      return { status: "error", data: {} as T };
    }
  }
}