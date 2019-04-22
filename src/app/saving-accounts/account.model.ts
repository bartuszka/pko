export class Account {
  constructor(
    private id: string,
    private accountNumber: string,
    private accountSum: number,
    private accountInterest: number
  ) {}

  public getId(): string {
    return this.id;
  }

  public getAccountNumber(): string {
    return this.accountNumber;
  }

  public getAccountSum(): number {
    return this.accountSum;
  }

  public getAccountInterest(): number {
    return this.accountInterest;
  }
}
