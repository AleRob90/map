import { Validators } from '@angular/forms';

export function getEmailValidator() {
  return Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
}
