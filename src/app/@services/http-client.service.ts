import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
  // root在頁面一打開就進行執行
})


export class HttpClientService {
  // httpClient=inhect(HttpClient)
  constructor(private httpClient: HttpClient) { }
// http-client是一個套件 可以幫助vscode讀取api的檔案類型

  // 撈取、讀取
  getApi(url: string) {
    return this.httpClient.get(url);
  }

  // 新增
  postApi(url: string, data: any) {
    return this.httpClient.post(url, data);
  }

  // 更改
  putApi(url: string, data: any) {
    return this.httpClient.put(url, data);
  }

  // 刪除
  delApi(url: string) {
    return this.httpClient.delete(url);
  }

}
