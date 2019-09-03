import { Action } from '@ngrx/store';
import * as routerActions from 'app/core/store/router/app-router.action';

import { AuthActions } from './auth.actions';
import { authInitialState, AuthState } from './auth.state';

export function reducer(
  state = authInitialState,
  action: Action & { payload?: any }): AuthState {
  switch (action.type) {

    // User state change
    case AuthActions.Types.USER_STATE_CHANGE: {
      return Object.assign({}, state, {
        user: action.payload,
        isLoggedIn: ((action.payload != null && action.payload.id != null && action.payload.verified) ? true : false)
      })
    }

    // Login
    case AuthActions.Types.LOGIN: {
      return Object.assign({}, state, {
        user: {
          email: action.payload.email
        },
        isLoading: true,
        error: null
      })
    }

    case AuthActions.Types.LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        user: action.payload.user,
        isLoggedIn: true,
        error: null,
        isLoading: false
      })
    }

    // Email Verification
    case AuthActions.Types.WAITING_VERIFICATION: {
      return Object.assign({}, state, {
        isLoading: false,
        error: null
      })
    }

    case AuthActions.Types.SEND_VERIFICATION: {
      return Object.assign({}, state, {
        isLoading: true,
        error: null,
        emailVerificationSent: false
      })
    }

    case AuthActions.Types.SEND_VERIFICATION_SUCCESS: {
      return Object.assign({}, state, {
        isLoading: false,
        error: null,
        emailVerificationSent: true
      })
    }

    // Forgot password
    case AuthActions.Types.SEND_FORGOT_PASSWORD: {
      return Object.assign({}, state, {
        isLoading: true,
        error: null,
        forgotPasswordSent: false
      })
    }

    case AuthActions.Types.SEND_FORGOT_PASSWORD_SUCCESS: {
      return Object.assign({}, state, {
        isLoading: false,
        error: null,
        forgotPasswordSent: true
      })
    }

    // Register User
    case AuthActions.Types.REGISTER_USER: {
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      })
    }

    case AuthActions.Types.REGISTER_USER_SUCCESS: {
      return Object.assign({}, state, {
        isLoading: false
      })
    }

    // Logout User
    case AuthActions.Types.LOGOUT_SUCCESS: {
      return authInitialState;
    }

    // Errors
    case AuthActions.Types.AUTH_ERROR: {
      return Object.assign({}, state, {
        error: action.payload,
        isLoading: false
      });
    }

    default: {
      return state;
    }

    // Remove errors when navigating between Auth pages
    case routerActions.ActionTypes.GO: {
      return Object.assign({}, state, {
        error: authInitialState.error,
        isLoading: authInitialState.isLoading
      });
    }

    case routerActions.ActionTypes.BACK: {
      return Object.assign({}, state, {
        error: authInitialState.error,
        isLoading: authInitialState.isLoading
      });
    }

    case routerActions.ActionTypes.FORWARD: {
      return Object.assign({}, state, {
        error: authInitialState.error,
        isLoading: authInitialState.isLoading
      });
    }

  }
}
