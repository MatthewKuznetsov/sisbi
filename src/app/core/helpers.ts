import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
  return (input: AbstractControl): ValidationErrors | null => {
    return /^.{8,}$/.test(input.value) ? null : { invalidEmail: "Нужно не менее 8 символов" };
  };
};

export function emailValidator(): ValidatorFn {
  return (input: AbstractControl): ValidationErrors | null => {
    return /^\S+@\S+\.\S+$/.test(input.value) ? null : { invalidEmail: "Не соответстовует шаблону xxx@xxx.xxx" };
  };
};

export function phoneValidator(): ValidatorFn {
  return (input: AbstractControl): ValidationErrors | null => {
    return /^\+7\d{10}$/.test(input.value) ? null : { invalidEmail: "Не соответстовует шаблону +7 (xxx) xxx-xx-xx" };
  };
};

export function forDigitsValidator(): ValidatorFn {
  return (input: AbstractControl): ValidationErrors | null => {
    return /^\d{4}$/.test(input.value) ? null : { invalidCode: "Код должен содержать 4 цифры" };
  };
};
