import { Component, OnInit } from '@angular/core';
import { Deposit } from '../deposit.model';
import { ActivatedRoute } from '@angular/router';
import { BankDepositsService } from '../bank-deposits.service';

@Component({
  selector: 'app-deposit-detail',
  templateUrl: './deposit-detail.component.html',
  styleUrls: ['./deposit-detail.component.scss']
})
export class DepositDetailComponent implements OnInit {

  public deposit: Deposit;

  constructor(private route: ActivatedRoute, private bankDepositService: BankDepositsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Deposit) => {
        this.deposit = this.bankDepositService.getDeposit(params['id']);
      }
    );
  }

}
