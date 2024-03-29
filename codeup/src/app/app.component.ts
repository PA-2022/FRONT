import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {SigninComponent} from "./signin/signin.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "./shared/services/authService";
import {User} from "./shared/entities/User";
import {SearchService} from "./shared/services/searchService";
import {Router} from "@angular/router";
import {NotificationService} from "./shared/services/NotificationService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Codeup';
  myControl = new FormControl();
  options: any[] = [];
  searchString = "";
  public isLogged:boolean = false;
  public loggedUser: User|undefined;
  notificationCount: number = 0;
  constructor(public dialog: MatDialog, private router: Router, private authService: AuthService, private searchService: SearchService, private notificationsService: NotificationService) {
    this.notificationsService.callEvent.subscribe(data => {
       this.notificationsService.getNotificationsCount().subscribe(response => {
         this.notificationCount = response;
       });
    });
    setTimeout(() => {
      this.notificationsService.getNotificationsCount().subscribe(response => {
        this.notificationCount = response;
      });
    }, 60000);
  }


  ngOnInit(){

    this.authService.userEvent.subscribe(value => {
      this.loggedUser = this.authService.loggedUser;
    });

    this.notificationsService.getNotificationsCount().subscribe(response => {
      this.notificationCount = response;
    })

    this.authService.getCurrentUser();

  }

  openSignin() {
    const dialogRef = this.dialog.open(SigninComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logout() {
    this.authService.logout()
  }

  lightSearch() {
    if(!!this.searchService && this.searchString !== "") {
      this.searchService.lightSearch(this.searchString).subscribe(result => {
        this.options = result;
      });
    }
  }

  goToPost(id: number) {
    //this.router.navigate(["/post/" + id]);
    window.location.href = ("/post/" + id);
  }

  fullSearch() {
    window.location.href = ("/search/" +this.searchString);
  }

}
