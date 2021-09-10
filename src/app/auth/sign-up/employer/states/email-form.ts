import { FormControl, Validators } from "@angular/forms";
import { emailValidator } from "src/app/core/helpers";
import { FormState, StateTypes } from "../../../statefull-form/form-state";
import { IStatefullForm } from "../../../statefull-form/statefull";
import { EmployerStatesFactory } from "../employer-sates-factory";
import { IEmployerData } from "../employer.component";

export class EmailForm extends FormState<IEmployerData> {

  type = StateTypes.EMAIL;
  form = new FormControl('', [Validators.required, emailValidator()])

  constructor(
    public target: IStatefullForm<IEmployerData>,
    private factory: EmployerStatesFactory,
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