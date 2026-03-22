import { Component, inject } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SigninDialog } from '../signin-dialog/signin-dialog';
import { Toaster } from '../../services/toaster';
import { UserStore } from '../../store/user';
import { Signup } from '../../models/user';
const checkPasswords: ValidatorFn = (control) => {
  const check = control.get('password')?.value === control.get('cPassword')?.value;
  return check ? null : { confirmPassword: true };
};
@Component({
  selector: 'app-signup-dialog',
  imports: [
    MatIconButton,
    MatIcon,
    MatDialogClose,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './signup-dialog.html',
  styleUrl: './signup-dialog.scss',
})
export class SignupDialog {
  userStore = inject(UserStore);
  fb = inject(NonNullableFormBuilder);
  dialogRef = inject(MatDialogRef);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  dialog = inject(MatDialog);
  toaster = inject(Toaster);
  form = this.fb.group(
    {
      username: ['example', Validators.required],
      email: ['example@test.com', [Validators.required, Validators.email]],
      password: ['1234', Validators.required],
      cPassword: ['1234', Validators.required],
    },
    { validators: [checkPasswords] },
  );
  getErrors(controllerName: 'email' | 'password' | 'cPassword' | 'username', type: string) {
    const control = this.form.get(controllerName);
    return control?.touched && control?.hasError(type);
  }
  signup() {
    if (!this.form.valid) {
      this.form.hasError('confirmPassword')
        ? this.toaster.error("password doesn't match confirm password")
        : null;
      this.form.markAllAsTouched();
      return;
    }
    const { email, password, username } = this.form.value;
    this.userStore.signup({
      email,
      name: username,
      username,
      password,
      dialogId: this.dialogRef.id,
      checkout: this.data?.checkout,
    } as Signup);
  }
  signin() {
    this.dialogRef.close();
    this.dialog.open(SigninDialog, {
      disableClose: false,
      data: {
        checkout: this.data?.checkout,
      },
    });
  }
}
