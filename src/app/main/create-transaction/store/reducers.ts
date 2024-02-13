import { Action, createReducer, on } from "@ngrx/store";
import { CreateTransactionStateInterface } from "../types/createTransactionState.interface";
import {
  getUsersAction,
  getUsersFailureAction,
  getUsersSuccessAction,
} from "./actions/getUsers.action";

const initialState: CreateTransactionStateInterface = {
  isLoading: false,
  isCreated: null,
  users: null,
  error: null,
};

const createTransactionReducer = createReducer(
  initialState,
  on(
    getUsersAction,
    (state): CreateTransactionStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getUsersSuccessAction,
    (state, action): CreateTransactionStateInterface => ({
      ...state,
      isLoading: false,
      users: action.users,
    })
  ),
  on(
    getUsersFailureAction,
    (state, action): CreateTransactionStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  )
);

export function reducers(
  state: CreateTransactionStateInterface,
  action: Action
) {
  return createTransactionReducer(state, action);
}
