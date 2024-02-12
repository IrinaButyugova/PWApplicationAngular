import { createFeatureSelector, createSelector } from "@ngrx/store";

import { MainStateInterface } from "../types/mainState.interface";

export const mainFeatureSelector =
  createFeatureSelector<MainStateInterface>("main");

export const isLoadingSelector = createSelector(
  mainFeatureSelector,
  (mainState: MainStateInterface) => mainState.isLoading
);

export const currentUserSelector = createSelector(
  mainFeatureSelector,
  (mainState: MainStateInterface) => mainState.currentUser
);

export const errorSelector = createSelector(
  mainFeatureSelector,
  (mainState: MainStateInterface) => mainState.error
);
