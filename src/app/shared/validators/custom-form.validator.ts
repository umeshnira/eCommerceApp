import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomFormValidator {

    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        return (value && value.toString().trim().length === 0) ? { whitespace: true } : null;
    }

}
