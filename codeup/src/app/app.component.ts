import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {SigninComponent} from "./signin/signin.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "./shared/services/authService";
import {User} from "./shared/entities/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Codeup';
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  public isLogged:boolean = false;
  public loggedUser: User|undefined;
  constructor(public dialog: MatDialog, private authService: AuthService) {
  }


  ngOnInit(){

    this.authService.userEvent.subscribe(value => {
      this.loggedUser = this.authService.loggedUser;
    });

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
}
