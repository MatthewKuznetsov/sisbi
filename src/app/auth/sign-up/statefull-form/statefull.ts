import { FormState } from "./form-state";

export interface IStatefullForm<D> {
    state: FormState<D>;
    data: D;
    setState(state: FormState<D>): void;
    loading(tatus: boolean): void;
}