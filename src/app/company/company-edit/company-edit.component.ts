import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  companyId: any;
  isNewCompany: boolean = false;
  companyForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private fb: FormBuilder) {
      this.companyForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl(),
        phone: new FormControl(),
     });
  }

  ngOnInit() {
    this.companyId = this.activatedRoute.snapshot.params.id;
    this.isNewCompany = !this.companyId;
    this.buildForm();

    if (!this.isNewCompany) {
      this.getCompany();
    }
   }

  getCompany():void {
    this.companyService.getCompany(this.companyId)
      .subscribe(company => {
        this.companyForm.patchValue(company);
      });
  }

  buildForm(): void {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      email: [''],
    });
  }

  saveCompany(): void {
    if (this.isNewCompany) {
      this.companyService.addCompany(this.companyForm.value);
    }
    else {
      const company = {...this.companyForm.value, id: this.companyId};
      this.companyService.updateCompany(company);
    }
  }

}
