import { TextMaskConfig } from "angular2-text-mask";
import { IStatefullForm } from "./statefull";

export abstract class FormState {

  mask?: TextMaskConfig;
  prev?: () => void;
  
  abstract type: string;
  abstract form: any;
  abstract target: IStatefullForm;

  abstract next(): void;

}
