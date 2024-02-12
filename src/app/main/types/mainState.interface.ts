import { CurrentUserInterface } from "./currentUser.interface";
import { TransactionInterface } from "./transaction.iterface";

export interface MainStateInterface {
  isLoading: boolean;
  currentUser: CurrentUserInterface | null;
  transactions: TransactionInterface[] | null;
  error: string | null;
}
