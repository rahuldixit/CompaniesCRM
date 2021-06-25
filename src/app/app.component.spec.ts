import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { CompanyService } from './company/company.service';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyTableComponent } from './company/company-table/company-table.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';


let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;
let companySvc: CompanyService;
let de: DebugElement;


describe('AppComponent', () => {
  beforeEach(() => {
    companySvc = {
      getCompanies: () => of([
        {
          name: 'Fake Company',
          email: 'fake@email.com',
          phone: 12345
        }
      ])
    } as CompanyService
    component = new AppComponent(companySvc);
  });

  it(`companyCount = 1`, () => {
    component.ngOnInit();
    component.companyCount$.subscribe(c => {
      expect(c).toEqual(1);
    });
  });

  it(`companyCount = 2`, () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: "Fake Company A",
        email: "fakeEmail@ssw.com.au",
        phone: 12345
      },
      {
        name: "Fake Company B",
        email: "fakeEmail@ssw.com.au",
        phone: 12345
      }
    ]))
    component.ngOnInit();
    component.companyCount$.subscribe(c => {
      expect(c).toEqual(2);
    });
  });

});

describe('AppComponent with TestBed', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CompanyListComponent,   // Our routing module needs it
        CompanyTableComponent,  // Our routing module needs it
        CompanyEditComponent,   // Our routing module needs it
      ],
      imports: [
        AppRoutingModule, // Routerlink in AppComponent needs it
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    companySvc = TestBed.inject(CompanyService);
  });

  it(`companyCount = 1`, () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: "Fake Company C",
        email: "fakeEmail@ssw.com.au",
        phone: 12345
      }
    ]))
    fixture.detectChanges();

    expect(component.companyCount$.subscribe(c => {
      expect(c).toEqual(1);
    }))
  });

  it(`CompanyCount HTML should update`, () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: "Fake Company C",
        email: "fakeEmail@ssw.com.au",
        phone: 12345
      }
    ]))
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('#company-count')).nativeElement;
    expect(el.textContent).toEqual('1');
  });
});
