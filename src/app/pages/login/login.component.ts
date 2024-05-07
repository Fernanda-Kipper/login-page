import {Component} from '@angular/core';
import {DefaultLoginLayoutComponent} from '../../components/default-login-layout/default-login-layout.component';
import {FormControl, FormControlStatus, FormGroup, FormRecord, ReactiveFormsModule, Validators} from '@angular/forms';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {ToastrService} from 'ngx-toastr';
import {NgIf} from "@angular/common";

interface LoginForm {
    email: FormControl,
    password: FormControl
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        DefaultLoginLayoutComponent,
        ReactiveFormsModule,
        PrimaryInputComponent,
        NgIf
    ],
    providers: [
        LoginService
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm!: FormGroup<LoginForm>;
    showErroMenssage: boolean = false;

    constructor(
        private router: Router,
        private loginService: LoginService,
        private toastService: ToastrService
    ) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        })
    }

    submit() {
        if (this.validate()) {
            this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
                next: () => this.toastService.success("Login feito com sucesso!"),
                error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
            })
        }
    }

    validate() {
        if (this.loginForm.status == 'VALID') {
            this.showErroMenssage = false;
            return true;
        } else {
            this.showErroMenssage = true;
            return false;
        }
    }


    navigate() {
        this.router.navigate(["signup"])
    }
}
