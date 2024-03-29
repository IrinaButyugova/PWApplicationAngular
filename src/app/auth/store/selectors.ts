import { createFeatureSelector, createSelector } from "@ngrx/store";

import { AuthStateInterface } from "../types/authState.interface";

export const authFeatureSelector =
  createFeatureSelector<AuthStateInterface>("auth");

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting
);

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn
);

export const errorSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.error
);
