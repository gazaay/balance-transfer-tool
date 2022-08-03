import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { loan_term, selectLoanValue } from './features/loanSlice'

import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import calculateMortgage from 'mortgage-calculator/lib/calculate_mortgage';
import { loanCalculator } from 'loan-calculator-js';
import {loanMonthlyPayment, loanPaymentToIncome, netIncomeBalance, totalInterest} from 'cashmoneyloan';

function preventDefault(event) {
  event.preventDefault();
}

function createData(title, data) {
  return { title, data };
}



const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
      decimalScale={2}
      fixedDecimalScale={true}

    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function CreditProposal() {
  const loan_value = useSelector(selectLoanValue);

  const income = 5000;
  const loanAmount =  loan_value.amount ;
  const monthlyLoanPeriod = loan_value.loanterms;
  const interestRate = loan_value.interestrate ;

  
  const monthlyLoanInstalment = loanMonthlyPayment(loanAmount,monthlyLoanPeriod,interestRate);
  const paymentToIncomeRatio = loanPaymentToIncome(monthlyLoanInstalment, income);
  const IncomeBalance = netIncomeBalance(income, monthlyLoanInstalment);

const my_totalInterest = totalInterest(monthlyLoanInstalment, monthlyLoanPeriod, loanAmount);

  const rows = [
    createData('Loan Amount', loanAmount),
    createData('Interest rate', interestRate),
    createData('Loan term', monthlyLoanPeriod),
    createData('Total Interest', my_totalInterest),
  ];


  return (
    <React.Fragment>
      <Title>Estimated Payment</Title>

      <Typography component="p" variant="h4"
      >
        <TextField
          value={monthlyLoanInstalment}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}>
        </TextField>
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        per month
      </Typography>
      <div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">

            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.title}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.data}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </React.Fragment>
  );
}
