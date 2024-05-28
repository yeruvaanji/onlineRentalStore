import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  constructor(private router: Router,private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
  onSubmit() {
    console.log('form data', this.loginForm.value);
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        (response) => {
          localStorage.setItem('UserEmail', response.email);
          localStorage.setItem('UserName', `${response.firstName}, ${response.lastName}`);
          localStorage.setItem('token', response.token);
          localStorage.setItem('userType', response.userType);
          this.router.navigate(['/properties']);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }
  register() {
    //this.router.navigateByUrl('/register');
  }
}
