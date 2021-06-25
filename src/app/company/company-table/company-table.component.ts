import { EventEmitter, Component, OnInit, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import {Company} from '../company';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyTableComponent implements OnInit {

  @Input()
  companies: Company[] | null = [];

  @Output()
  deleteButtonClicked = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteCompany(companyId: number) {
    this.deleteButtonClicked.emit(companyId);
  }
}
