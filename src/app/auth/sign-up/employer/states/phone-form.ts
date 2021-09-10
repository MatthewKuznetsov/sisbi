import { FormControl, Validators } from "@angular/forms";
import { phoneValidator } from "src/app/core/helpers";
import { FormState } from "../../../statefull-form/form-state";
import { IStatefullForm } from "../../../statefull-form/statefull";
import { EmployerStatesFactory } from "../employer-sates-factory";
import { IEmployerData } from "../employer.component";

export class PhoneForm extends FormState<IEmployerData> {

  type = 'phone';
  form = new FormControl('', [Validators.required, phoneValidator()])

  constructor(
    public target: IStatefullForm<IEmployerData>,
    private factory: EmployerStatesFactory,
  ) { super(); }

  next(): void {
    if (!this.form.valid) { return; }
    this.target.loading(true);
    this.factory.authService
      .verifyPhone$(this.form.value)
      .subscribe({
        next: () => {
          this.target.loading(false);
          this.target.data.phone = this.form.value;
          this.target.setState(this.factory.smsVerificationForm);
        },
        error: () => {
          this.target.loading(false);
          this.form.reset();
        }
      });
  }

  prev(): void { }

}