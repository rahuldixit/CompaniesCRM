import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appState';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies$!: Observable<Company[]>;

  constructor(
    private store: Store<AppState>,
    private companyService: CompanyService
    ) {
    this.companies$ = this.store.select(state => state.companies);
   }

  ngOnInit(): void {
    this.loadCompanies()
  }

  loadCompanies(): void {
    this.companyService.loadCompanies();
  }

  deleteCompany(companyId: number) : void {
    this.companyService.deleteCompany(companyId)
  }
}
