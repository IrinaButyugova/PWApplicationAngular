import { createAction, props } from "@ngrx/store";

import { ActionTypes } from "../actionTypes";
import { TransactionInterface } from "../../../types/transaction.iterface";

export const getTransactionsAction = createAction(ActionTypes.GET_TRANSACTIONS);

export const getTransactionsSuccessAction = createAction(
  ActionTypes.GET_TRANSACTIONS_SUCCESS,
  props<{ transactions: TransactionInterface[] }>()
);

export const getTransactionsFailureAction = createAction(
  ActionTypes.GET_TRANSACTIONS_FAILURE,
  props<{ error: string }>()
);
