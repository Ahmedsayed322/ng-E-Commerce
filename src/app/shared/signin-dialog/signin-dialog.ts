import { Component, inject, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { signin } from '../../models/user';
import { UserStore } from '../../store/user';
import { SignupDialog } from '../signup-dialog/signup-dialog';

@Component({
  selector: 'app-signin-dialog',
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
  templateUrl: './signin-dialog.html',
  styleUrl: './signin-dialog.scss',
})
export class SigninDialog {
  userStore = inject(UserStore);
  hide = signal(true);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  dialog = inject(MatDialog);
  togglePassword() {
    this.hide.set(!this.hide());
  }
  fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    email: ['ex@ex.com', [Validators.required]],
    password: ['123', [Validators.required]],
  });
  logIn() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.value;
    this.userStore.logIn({
      email: email,
      password: password,
      checkout: this.data?.checkout,
      dialogId: this.dialogRef.id,
    } as signin);
  }
  signup() {
    this.dialogRef.close();
    this.dialog.open(SignupDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout,
      },
    });
  }
}
