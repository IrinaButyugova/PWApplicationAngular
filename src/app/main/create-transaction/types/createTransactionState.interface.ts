import { UserInterface } from "../../types/user.interface";

export interface CreateTransactionStateInterface {
  isLoading: boolean;
  isCreated: boolean | null;
  users: UserInterface[] | null;
  error: string | null;
}
