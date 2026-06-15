import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { FormErrorLabel } from '../form-error-label/form-error-label';

@Component({
  selector: 'ds-field',
  standalone: true,
  imports: [CommonModule, FormErrorLabel],
  templateUrl: './ds-field.html',
  styleUrls: ['./ds-field.css'],
})
export class DsField {
  @Input() label?: string;
  @Input() control: AbstractControl | null = null;
  @Input() required: boolean | string = false;
}
