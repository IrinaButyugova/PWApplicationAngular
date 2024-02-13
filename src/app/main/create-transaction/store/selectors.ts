import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CreateTransactionStateInterface } from "../types/createTransactionState.interface";

export const createTransactionFeatureSelector =
  createFeatureSelector<CreateTransactionStateInterface>("createTransaction");

export const isLoadingSelector = createSelector(
  createTransactionFeatureSelector,
  (dataState: CreateTransactionStateInterface) => dataState.isLoading
);

export const isCreatedSelector = createSelector(
  createTransactionFeatureSelector,
  (dataState: CreateTransactionStateInterface) => dataState.isCreated
);

export const usersSelector = createSelector(
  createTransactionFeatureSelector,
  (dataState: CreateTransactionStateInterface) => dataState.users
);

export const errorSelector = createSelector(
  createTransactionFeatureSelector,
  (dataState: CreateTransactionStateInterface) => dataState.error
);
