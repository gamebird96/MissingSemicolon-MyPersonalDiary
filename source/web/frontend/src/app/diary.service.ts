import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
/**
 * Decorator that marks a class as available to be provided and injected as a dependency
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Class to deploy diary service
 */
export class DiaryService {
  serverUri = 'http://localhost:3000';
  /**
   * constructor to initialize variables
   * @param http Address of httpclient
   * @param router Helps to navigate from one url to another
   */
  constructor(private http: HttpClient, private router: Router) { }

  savePost(data, uname, image, timestamp, pvt) {
    const postData = {
      uname: uname,
      title: data.title,
      post: data.post,
      img: image,
      timestamp: timestamp,
      private: pvt

    };
    //console.log(`${this.serverUri}/posts/add`);
    console.log(postData);
    return this.http.post(`${this.serverUri}/posts/add`, postData);

  }
  /**
   * fetches user posts 
   * @param uname Username of user
   */
  getPosts(uname) {
    return this.http.get(`${this.serverUri}/posts/view?uname=` + uname);
  }
  /**
   * Fetches image if loaded by user
   * @param uname Username
   * @param id ID of user
   */
  fetchImageBase64(uname, id) {
    return this.http.get(`${this.serverUri}/posts/img?uname=` + uname+'&id=' + id);
  }
  /**
   * Used when user wants to delete a post
   * @param uname Username
   * @param title Title of post
   */
  deletePost(uname, title)
  {
    const postData = {
      uname: uname,
      title: title
    }
    return this.http.post(`${this.serverUri}/posts/remove`, postData);
  }
}
