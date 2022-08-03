import { createSlice } from '@reduxjs/toolkit'

export const loanSlice = createSlice({
    name: 'loan',
    initialState: {
        loanterms: 10,
        interestrate: 1.2,
        amount:100000
    },
    reducers: {
        loan_term: (state, action) => {
            console.info("Before update: ", state.loanterms);
            state = {
                ...state,
                loanterms: action.payload
            }
            return state;
        },
        interest_rate: (state, action) => {
            state = {
                ...state,
                interestrate: action.payload
            }
            return state;
        },
        amount: (state, action) => {
            state = {
                ...state,
                amount: action.payload
            }
            console.info(action.payload);
            return state;
        },
    }

})

export const { loan_term, interest_rate, amount } = loanSlice.actions;

export const selectLoanValue = (state) => state.loan;
export const selectLoanTerms = (state) => {
    return state.loan.loanterms;}
export const selectLoanInterestRate= (state) => state.loan.interestrate;

export default loanSlice.reducer