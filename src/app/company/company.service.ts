import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Company} from './company';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { LOAD_COMPANIES } from './../reducers/company.reducer';
import { AppState } from '../models/appState';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companies$ : BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([])

  API_BASE = environment.API_BASE;

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>
    ) { }


  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.log('[SERVICE] error', error);
    return new Observable<T>();
  }

  public deleteCompany(companyId: number) {
    this.httpClient.delete<Company>(
      `${this.API_BASE}/company/${companyId}`
    ).pipe(
      catchError(e=> this.errorHandler<Company>(e))
    )
    .subscribe(company=> this.loadCompanies());
  }

  public addCompany(company: Company) {
    this.httpClient.post<Company>(
      `${this.API_BASE}/company`, company, { headers: new HttpHeaders().set('content-type', 'application/json') }
    ).pipe(catchError(e => this.errorHandler<Company>(e)))
    .subscribe(company=> this.loadCompanies());
  }


  public getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(catchError(e => this.errorHandler<Company>(e)));
  }

  public updateCompany(company: Company) {
    this.httpClient.put<Company>(
      `${this.API_BASE}/company/${company.id}`, company,
      { headers: new HttpHeaders().set('content-type', 'application/json') }
    ).pipe(catchError(e => this.errorHandler<Company>(e)))
    .subscribe(company=> this.loadCompanies());
  }

  loadCompanies(){
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
        catchError(e=> this.errorHandler<Company[]>(e)),
    ).subscribe(companies => {
        this.companies$.next(companies);
        this.store.dispatch({
        type: LOAD_COMPANIES,
        payload: companies
      });
    }
  );
  }
}
