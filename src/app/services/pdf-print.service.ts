// pdf-print.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PdfPrintService {
  private serverUrl = 'http://124.124.79.122:1020/softlanddownloads/DEVRELEASE/2023/ANDROID/PdfReader/Version1.0.0';

  constructor(private http: HttpClient) {}

  printPdf(printableContent: string) {
    const apiUrl = `${this.serverUrl}/print-pdf`;

    return this.http.post(apiUrl, { printableContent });
  }
}
