import { AuthenticationUser } from '../model/authentication-user.model';
import { Injectable } from '@angular/core';
import { ActionCreator } from 'app/core/store/util/action-creator';
import { type } from 'app/core/store/util/util';

import { AuthenticationError } from '../model/authentication-error.model';
import { ForgotPasswordRequest } from '../payload/forgotPassword';
import { LoginRequest, LoginResponse } from '../payload/login';
import { RegisterUserRequest, RegisterUserResponse } from '../payload/registerUser';
import { LoginStateCheckRequest } from './../payload/login';


@Injectable()
export class AuthActions {

    static Types = {
        USER_STATE_CHANGE: type('[Auth] -USER_STATE_CHANGE Requested-'),

        LOGIN: type('[Auth] -LOGIN Requested-'),
        LOGIN_STATE_CHECK: type('[Auth] -LOGIN_STATE_CHECK Success-'),
        LOGIN_SUCCESS: type('[Auth] -LOGIN Success-'),
        LOGIN_GOOGLE: type('[Auth] -LOGIN_GOOGLE Requested-'),

        WAITING_VERIFICATION: type('[Auth] -WAITING_VERIFICATION-'),

        LOGOUT: type('[Auth] -LOGOUT Requested-'),
        LOGOUT_SUCCESS: type('[Auth] -LOGOUT Success-'),

        SEND_VERIFICATION: type('[Auth] -SEND_VERIFICATION Requested-'),
        SEND_VERIFICATION_SUCCESS: type('[Auth] -SEND_VERIFICATION Success-'),

        SEND_FORGOT_PASSWORD: type('[Auth] -SEND_FORGOT_PASSWORD Requested-'),
        SEND_FORGOT_PASSWORD_SUCCESS: type('[Auth] -SEND_FORGOT_PASSWORD Success-'),

        REGISTER_USER: type('[Auth] -REGISTER_USER Requested-'),
        REGISTER_USER_SUCCESS: type('[Auth] -REGISTER_USER Success-'),

        AUTH_ERROR: type('[Auth] -Auth Error-')
    }

    userStateChangeAction = ActionCreator.create<AuthenticationUser>(AuthActions.Types.USER_STATE_CHANGE);

    loginAction = ActionCreator.create<LoginRequest>(AuthActions.Types.LOGIN);
    loginStateCheckAction = ActionCreator.create<LoginStateCheckRequest>(AuthActions.Types.LOGIN_STATE_CHECK);
    loginSuccessAction = ActionCreator.create<LoginResponse>(AuthActions.Types.LOGIN_SUCCESS);
    loginGoogleAction = ActionCreator.create(AuthActions.Types.LOGIN_GOOGLE);

    waitingVerificationAction = ActionCreator.create<LoginResponse>(AuthActions.Types.WAITING_VERIFICATION);

    sendVerificationAction = ActionCreator.create(AuthActions.Types.SEND_VERIFICATION);
    sendVerificationSuccessAction = ActionCreator.create(AuthActions.Types.SEND_VERIFICATION_SUCCESS);

    sendForgotPasswordAction = ActionCreator.create<ForgotPasswordRequest>(AuthActions.Types.SEND_FORGOT_PASSWORD);
    sendForgotPasswordSuccessAction = ActionCreator.create(AuthActions.Types.SEND_FORGOT_PASSWORD_SUCCESS);

    logoutAction = ActionCreator.create(AuthActions.Types.LOGOUT);
    logoutSuccessAction = ActionCreator.create(AuthActions.Types.LOGOUT_SUCCESS);

    registerUserAction = ActionCreator.create<RegisterUserRequest>(AuthActions.Types.REGISTER_USER);
    registerUserSuccessAction = ActionCreator.create<RegisterUserResponse>(AuthActions.Types.REGISTER_USER_SUCCESS);

    authErrorAction = ActionCreator.create<AuthenticationError>(AuthActions.Types.AUTH_ERROR);

}
