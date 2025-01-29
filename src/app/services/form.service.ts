import { computed, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.form.valid) {
      alert(`Form submited ${JSON.stringify(this.form.value)}`);
    } else {
      alert('Form is invalid, deer');
    }
  }
}
