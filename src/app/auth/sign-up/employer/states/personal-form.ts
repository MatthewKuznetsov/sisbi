import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { FormState, StateTypes } from "../../statefull-form/form-state";
import { IStatefullForm } from "../../statefull-form/statefull";
import { IEmployerData } from "../employer.component";
import { EmailForm } from "./email-form";
import { PasswordForm } from "./password-form";

export class PersonalForm extends FormState<IEmployerData> {

  type = StateTypes.PERSONAL;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    organization: new FormControl('', [Validators.required])
  });

  constructor(
    public target: IStatefullForm<IEmployerData>,
    private _authService: AuthService,
    private _router: Router,
  ) {
    super();
    this.target.data.name = undefined;
    this.target.data.organization = undefined;
  }

  next(): void {
    if (!this.form.valid) { return; }
    this.target.data.name = this.form.get('name')?.value;
    this.target.data.organization = this.form.get('organization')?.value;
    this.target.setState(
      new PasswordForm(
        this.target,
        this._authService,
        this._router,
      )
    );
  }

  prev(): void {
    this.target.data = {};
    this.target.setState(
      new EmailForm(
        this.target,
        this._authService,
        this._router,
      )
    );
  }

}