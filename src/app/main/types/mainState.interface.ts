import { CurrentUserInterface } from "./currentUser.interface";

export interface MainStateInterface {
  isLoading: boolean;
  currentUser: CurrentUserInterface | null;
  error: string | null;
}
