import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})
export class QueryService {
  serverUri = 'http://localhost:3000';
  constructor(private http: HttpClient, private router: Router) { }

  query(queryString: string) {
    var postData = {
      query: queryString
    }
    return this.http.post(`${this.serverUri}/search`, postData);
  }
}
