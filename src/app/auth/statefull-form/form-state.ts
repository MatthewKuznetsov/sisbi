import { TextMaskConfig } from "angular2-text-mask";
import { IStatefullForm } from "./statefull";

export abstract class FormState<D> {

  mask?: TextMaskConfig;
  abstract type: string;
  abstract form: any;
  abstract target: IStatefullForm<D>;

  abstract next(): void;
  abstract prev(): void;

}
