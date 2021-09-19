import { FormControl, Validators } from "@angular/forms";
import { FormState } from "../../../statefull-form/form-state";
import { IStatefullForm } from "../../../statefull-form/statefull";
import { emailValidator } from "src/app/core/helpers";
import { ApplicantStatesFactory } from "../applicant-states-factory";

export class EmailForm extends FormState {

  type = 'email';
  form = new FormControl('', [Validators.required, emailValidator()])

  constructor(
    public target: IStatefullForm,
    private factory: ApplicantStatesFactory,
  ) { super(); }

  next(): void {
    if (!this.form.valid) { return; }
    this.target.loading(true);
    this.factory.authService
      .verifyEmail$(this.form.value)
      .subscribe({
        next: () => {
          this.target.loading(false);
          this.target.data.email = this.form.value;
          this.target.setState(this.factory.emailVerificationForm);
        },
        error: () => {
          this.target.loading(false);
          this.form.reset();
        }
      });
  }

  prev(): void { }

}