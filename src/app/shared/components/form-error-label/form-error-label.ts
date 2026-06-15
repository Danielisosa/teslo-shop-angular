import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormUtils } from '@utils/form-utils';

@Component({
  selector: 'form-error-label',
  standalone: true,
  templateUrl: './form-error-label.html',
  styleUrls: ['./form-error-label.css'],
})
export class FormErrorLabel {
  @Input() control: AbstractControl | null = null;

  get errorMessage(): string | null {
    const errors: ValidationErrors = this.control?.errors || {};

    return this.control?.touched && Object.keys(errors).length > 0
      ? FormUtils.getTextError(errors)
      : null;
  }
}
