import { Component } from "@angular/core";
import { AuthenticationService } from "../shared/authentication.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  userForm: FormGroup;

  constructor(
    public authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  signUp() {
    this.authenticationService.SignUp(this.userForm.value);
  }

  signIn() {
    this.authenticationService.SignIn(this.userForm.value);
  }

  signOut() {
    this.authenticationService.SignOut();
  }
}
