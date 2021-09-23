import { BehaviorSubject } from "rxjs";
import { FormState } from "./form-state";

type StatefullFormData = { [key: string]: any; };

export abstract class IStatefullForm {

  private _loading$$ = new BehaviorSubject<boolean>(false);

  loading$ = this._loading$$.asObservable();
  state?: FormState;
  data: StatefullFormData = {};

  constructor() { }
  
  abstract submit(): void;

  setState(state: FormState): void {
    this.state = state;
  }
  
  loading(status: boolean): void {
    this._loading$$.next(status);
  }
  
  next(): void {
    this.state?.next();
  }
  
  prev(): void {
    this.state?.prev && this.state.prev();
  }

  hasPrev(): boolean {
    return !!this.state?.prev;
  }

}
