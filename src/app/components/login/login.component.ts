import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm() {
    this.userLoginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLoginSubmit() {
    if (this.userLoginForm.valid) {
      const userLogin: User = this.userLoginForm.value;
      this.apiService.loginUser(userLogin).subscribe({
        next: (response) => {
          if (response) {
            console.log('Token recibido:', response);
            this.authService.setToken(response);
            this.router.navigate(['/contacts-list']);
          } else {
            console.log('La respuesta no contiene un token válido.');
          }
        },
        error: (error) => {
          console.log('Error en el login:', error);
        },
      });
    }
  }
}
