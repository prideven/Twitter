import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { AddTweetComponent } from '../add-tweet/add-tweet.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
public tweets = [];
  constructor(private homeService: HomeService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }


  getTweets() {
    this.homeService.getTweets().subscribe(data => {
      this.tweets = data;
    })
  }

  postTweet() {
    const dialogRef = this.dialog.open(AddTweetComponent, {
      height: '400px',
      width: '600px',

    });
  }

  deleteTweet(id) {
    this.homeService.deleteTweet(id).subscribe(data => {
      console.log('deleted')
      this._snackBar.open('Tweet Deleted','', {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
      this.getTweets();
    }, error => {
      console.log(error);
    })
  }
  ngOnInit(): void {
    this.getTweets();
    this.homeService.tweetAdded.subscribe(data => {
      if(data) {
        this.getTweets();
      }
    });
  }



}
