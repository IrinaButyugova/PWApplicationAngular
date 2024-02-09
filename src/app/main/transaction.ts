export class Transaction {
  id: string;
  date: Date;
  username: string;
  amount: number;
  balance: number;

  constructor(
    id: string,
    date: Date,
    username: string,
    amount: number,
    balance: number
  ) {
    this.id = id;
    this.date = date;
    this.username = username;
    this.amount = amount;
    this.balance = balance;
  }
}
