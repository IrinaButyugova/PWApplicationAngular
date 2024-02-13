import { CurrentUserInterface } from "../../types/currentUser.interface";
import { TransactionInterface } from "../../types/transaction.iterface";

export interface DataStateInterface {
  isLoading: boolean;
  currentUser: CurrentUserInterface | null;
  transactions: TransactionInterface[] | null;
  error: string | null;
}
