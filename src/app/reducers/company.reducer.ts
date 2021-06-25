import { Company } from './../company/company';
import { ActionReducer, Action } from '@ngrx/store';

export const LOAD_COMPANIES = 'LOAD_COMPANIES';

export function companyReducer(state = [], action: any) {
    switch (action.type) {
        case LOAD_COMPANIES:
            return action.payload;
        default:
            return state;
    }
};
