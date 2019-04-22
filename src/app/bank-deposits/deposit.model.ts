export class Deposit {
  constructor(
    private id: string,
    private depositNumber: string,
    private depositSum: number,
    private depositInterest: number
  ) {}

  public getId(): string {
    return this.id;
  }

  public getAccountNumber(): string {
    return this.depositNumber;
  }

  public getAccountSum(): number {
    return this.depositSum;
  }

  public getAccountInterest(): number {
    return this.depositInterest;
  }
}
