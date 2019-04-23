import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-saving-accounts',
  templateUrl: './saving-accounts.component.html',
  styleUrls: ['./saving-accounts.component.scss']
})
export class SavingAccountsComponent implements OnInit {
  public pageInitialized: boolean = false;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.pageInitialized = data['appInit'];
      }
    );
  }
}
