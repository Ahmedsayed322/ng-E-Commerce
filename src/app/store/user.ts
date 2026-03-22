import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { signin, Signup, User } from '../models/user';
import { afterNextRender, inject } from '@angular/core';
import { Toaster } from '../services/toaster';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SigninDialog } from '../shared/signin-dialog/signin-dialog';
import { SignupDialog } from '../shared/signup-dialog/signup-dialog';

type UserState = {
  user: User | null;
  error: string | null;
  loading: boolean;
};
const initialState: UserState = {
  user: null,
  error: null,
  loading: true,
};
export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({})),

  withMethods(
    (
      store,
      toast = inject(Toaster),
      dialog = inject(MatDialog),
      router = inject(Router),
    ) => ({
      logIn: signalMethod((credentials: signin) => {
        patchState(store, {
          user: null,
          error: null,
          loading: true,
        });
        if (credentials.email === 'ex@ex.com' && credentials.password === '123') {
          patchState(store, {
            error: null,
            user: {
              name: 'ahmed',
              id: '1',
              email: 'ex@ex.com',
              imageUrl:
                'https://englishleaflet.com/wp-content/uploads/2025/04/boy-dp-70-e1744744921633.jpg',
            },
            loading: false,
          });
          toast.success(`welcome ${store.user!()?.name}`);
          if (credentials.checkout) {
            router.navigate(['checkout']);
          }
          const closeDialog = dialog.getDialogById(credentials.dialogId);
          closeDialog?.close();
          localStorage.setItem('user', JSON.stringify(store.user()));
          return;
        }
        patchState(store, {
          user: null,
          error: 'invalid email/password',
          loading: false,
        });

        toast.error(`${store.error!()}`);
      }),
      signup: signalMethod((credentials: Signup) => {
        patchState(store, {
          loading: false,
          error: undefined,
          user: {
            id: '2',
            name: credentials.name,
            email: credentials.email,
            imageUrl:
              'https://englishleaflet.com/wp-content/uploads/2025/04/boy-dp-70-e1744744921633.jpg',
          },
        });

        if (credentials.checkout) {
          router.navigate(['/check-out']);
        }
        localStorage.setItem('user', JSON.stringify(store.user()));
        dialog.getDialogById(credentials.dialogId)?.close();
      }),
      logOut: () => {
        patchState(store, initialState);
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        localStorage.removeItem('wishlist');
       
      },

      openSignupDialog: () => {
        dialog.open(SignupDialog, {
          disableClose: false,
        });
      },
      openSigninDialog: () => {
        dialog.open(SigninDialog, {
          disableClose: false,
        });
      },
    }),
  ),
  withHooks({
    onInit(store) {
      afterNextRender(() => {
        const user = JSON.parse(localStorage.getItem('user')!) as User;
        if (user) {
          patchState(store, { error: null, loading: false, user });
        }
      });
    },
  }),
);
