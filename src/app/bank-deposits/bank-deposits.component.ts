import { Component, OnInit } from '@angular/core';
import { BankDepositsService } from './bank-deposits.service';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-bank-deposits',
  templateUrl: './bank-deposits.component.html',
  styleUrls: ['./bank-deposits.component.scss']
})
export class BankDepositsComponent implements OnInit {
  public pageInitialized: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bankDepositsService: BankDepositsService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.pageInitialized = data['appInit'];
      }
    );

    this.bankDepositsService.fetchDeposits();
  }
}
