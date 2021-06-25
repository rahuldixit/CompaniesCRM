import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanyService } from './company/company.service';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebootcamp-crm-syd2021';
  companyCount$!: Observable<number>;

  constructor(
    private companyService: CompanyService
  ) {

  }

  ngOnInit() {
    this.companyCount$ = this.companyService.getCompanies().pipe(map(c => c.length))
  }

}
