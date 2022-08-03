import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { Button, Input, Slider, TextField } from '@mui/material';
import PropTypes from 'prop-types';

import NumberFormat from 'react-number-format';


import { loan_term, interest_rate, amount, selectLoanValue, selectLoanTerms, selectLoanInterestRate } from './features/loanSlice'

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

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
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function Calculator() {
  const theme = useTheme();
  // const [interest, setInterest] = React.useState(1.2);
  // const [term, setTerm] = React.useState(5);
  const dispatch = useDispatch();

  const loan_value = useSelector(selectLoanValue);

  const handleLoanTermChange = (event, newValue) => {
    dispatch(loan_term(newValue));
  };
  const handleLoanAmountChange = (event, newValue) => {
    dispatch(amount(event.target.value));
  };

  const handleInterestChange = (event, newValue) => {
    dispatch(interest_rate(newValue));
  };


  return (
    <React.Fragment>
      <Title>Calculator</Title>
      {/* <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer> */}
     <p>
      <span>Loan Terms: {loan_value.loanterms} months</span>
      <br/>
      <span>Interest Rate: {loan_value.interestrate} % </span>
      
      </p> 


      <TextField id="outlined-basic"
        label="Loan Amount"
        variant="outlined"
        value={loan_value.amount} 
        onChange={handleLoanAmountChange}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }} />

      Interest Rate:
      <Slider aria-label="LoanTerm"
        value={loan_value.interestrate}
        onChange={handleInterestChange}
        step={0.1}
        min={1.0}
        max={8}
      />
      Loan Term:
      <Slider aria-label="LoanTerm"
        value={loan_value.loanterms}
        onChange={handleLoanTermChange} />
    </React.Fragment>
  );
}
