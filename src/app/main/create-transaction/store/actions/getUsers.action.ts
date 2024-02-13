import { createAction, props } from "@ngrx/store";

import { ActionTypes } from "../actionTypes";
import { UserInterface } from "../../../types/user.interface";

export const getUsersAction = createAction(ActionTypes.GET_USERS);

export const getUsersSuccessAction = createAction(
  ActionTypes.GET_USERS_SUCCESS,
  props<{ users: UserInterface[] }>()
);

export const getUsersFailureAction = createAction(
  ActionTypes.GET_USERS_FAILURE,
  props<{ error: string }>()
);
