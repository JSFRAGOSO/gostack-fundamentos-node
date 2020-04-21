import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface ResponseAllDTO {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): ResponseAllDTO {
    const transactionsWithBalance = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return transactionsWithBalance;
  }

  public getBalance(): Balance {
    let incomeValue = 0;
    let outcomeValue = 0;
    let total = 0;

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        incomeValue += transaction.value;
      } else {
        outcomeValue += transaction.value;
      }
    });

    total = incomeValue - outcomeValue;

    const balance: Balance = {
      income: incomeValue,
      outcome: outcomeValue,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
