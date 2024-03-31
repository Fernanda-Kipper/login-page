import {Component} from '@angular/core';
import {DefaultLoginLayoutComponent} from '../../components/default-login-layout/default-login-layout.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {ToastrService} from 'ngx-toastr';
import {NgIf} from "@angular/common";

interface SignupForm {
    name: FormControl,
    email: FormControl,
    password: FormControl,
    passwordConfirm: FormControl
}

@Component({
    selector: 'app-signup',
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
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignUpComponent {
    signupForm!: FormGroup<SignupForm>;
    showMenssageErrorPassword: boolean = false;
    showMenssageErrorEmail: boolean = false;


    constructor(
        private router: Router,
        private loginService: LoginService,
        private toastService: ToastrService
    ) {
        this.signupForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
        })
    }

    submit() {
        if (this.validate()) {
            this.loginService.signup(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password).subscribe({
                next: () => this.toastService.success("Login feito com sucesso!"),
                error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
            })
        }
    }

    validate() {
        if (this.signupForm.valid) {
            this.showMenssageErrorPassword = false;
            this.showMenssageErrorEmail = false;
            return true;
        } else {
            this.showMenssageErrorPassword = this.signupForm.value.password != this.signupForm.value.passwordConfirm;
            this.showMenssageErrorEmail = (this.signupForm.value.email != "" && !this.signupForm.value.email.includes("@"));
            return false;
        }
    }


    navigate() {
        this.router.navigate(["login"])
    }
}
