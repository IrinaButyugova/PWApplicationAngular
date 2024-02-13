import { createFeatureSelector, createSelector } from "@ngrx/store";

import { DataStateInterface } from "../types/dataState.interface";

export const dataFeatureSelector =
  createFeatureSelector<DataStateInterface>("data");

export const isLoadingSelector = createSelector(
  dataFeatureSelector,
  (dataState: DataStateInterface) => dataState.isLoading
);

export const currentUserSelector = createSelector(
  dataFeatureSelector,
  (dataState: DataStateInterface) => dataState.currentUser
);

export const transactionsSelector = createSelector(
  dataFeatureSelector,
  (dataState: DataStateInterface) => dataState.transactions
);

export const errorSelector = createSelector(
  dataFeatureSelector,
  (dataState: DataStateInterface) => dataState.error
);
