import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc: Balance, current: TransactionDTO) => {
        if (current.type === 'income') {
          acc.income += current.value;
        } else if (current.type === 'outcome') {
          acc.outcome += current.value;
        }
        return {
          income: acc.income,
          outcome: acc.outcome,
          total: acc.income - acc.outcome,
        };
      },
      {
        outcome: 0,
        income: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
