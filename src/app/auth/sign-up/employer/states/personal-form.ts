import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormState, StateTypes } from "../../../statefull-form/form-state";
import { IStatefullForm } from "../../../statefull-form/statefull";
import { EmployerStatesFactory } from "../employer-sates-factory";
import { IEmployerData } from "../employer.component";

export class PersonalForm extends FormState<IEmployerData> {

  type = StateTypes.PERSONAL;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    organization: new FormControl('', [Validators.required])
  });

  constructor(
    public target: IStatefullForm<IEmployerData>,
    private factory: EmployerStatesFactory,
  ) {
    super();
    this.target.data.name = undefined;
    this.target.data.organization = undefined;
  }

  next(): void {
    if (!this.form.valid) { return; }
    this.target.data.name = this.form.get('name')?.value;
    this.target.data.organization = this.form.get('organization')?.value;
    this.target.setState(this.factory.passwordForm);
  }

  prev(): void {
    this.target.data = {};
    this.target.setState(this.factory.emailForm);
  }

}