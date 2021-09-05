import { TextMaskConfig } from "angular2-text-mask";
import { IStatefullForm } from "./statefull";

export enum StateTypes {
    PHONE = 'phone',
    EMAIL = 'email',
    SMS_VERIFICATION = 'sms-verification',
    EMAIL_VERIFICATION = 'email-verification',
    PASSWORD = 'password'
}

export abstract class FormState<D> {
    
    mask?: TextMaskConfig;
    abstract type: StateTypes;
    abstract form: any;
    abstract target: IStatefullForm<D>;

    abstract next(): void;
    abstract prev(): void;

}
