import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiaryService } from '../diary.service';

/**
 * exports JSON file containing image
 */
export class jsonImage {
  _id?;
  image: string;
}
/**
 * Component to handle user posts
 */
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  id: string;
  myurl:string;
  uname: string;
  imgpath:string;
  title:string;
  timeStamp:string;
  post:string;
  /**
   * constructor to initialize variables
   * @param diaryService Handles posting and retrieving information
   * @param router Helps in connecting multiple webpages
   */
  constructor(private diaryService: DiaryService, private router: Router) { }
/**
 * Function to fetch data from database for display purpose
 */
  ngOnInit() {
    this.myurl = window.location.href;
    var url = new URL(this.myurl);
    //this.imgpath = url.searchParams.get('imgpath');
    this.id = url.searchParams.get('id');
    this.title = url.searchParams.get('title');
    this.timeStamp = url.searchParams.get('timeStamp');
    this.post = url.searchParams.get('post');
    this.uname = url.searchParams.get('uname');
    console.log(this.id + ' ' + this.title + ' ' + this.timeStamp + ' ' + this.post);
    this.diaryService.fetchImageBase64(this.uname, this.id).subscribe( (res: Response) => {
      console.log(res);
      var obj = res as unknown as jsonImage[];
      console.log(obj);
      this.imgpath = obj[0].image;
    });
    console.log(this.imgpath);
  }

}
