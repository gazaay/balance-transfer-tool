import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData( id, date, name, amount, terms, monthly,interest) {
  return { id, date, name, amount, terms, monthly,interest };
}

const rows = [
  createData(
    0,
    '16 Mar, 2020',
    'Citi bank',
    300000,
    24,
    14000,
    25000.72,
  ),
  createData(
    1,
    '06 Dec, 2020',
    'HSBC',
    200000,
    36,
    8000,
    21125.64,
  ),
  createData(
    1,
    '19 Jan, 2022',
    'HSBC',
    100000,
    12,
    9699,
    6034.42,
  ),
  createData(
    1,
    '26 April, 2022',
    'HSBC',
    300000,
    6,
    62030,
    7230.21,
  ),
 
];

function preventDefault(event) {
  event.preventDefault();
}

export default function CurrentLoan() {
  return (
    <React.Fragment>
      <Title>Current Loan </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Bank</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="center">Terms</TableCell>
            <TableCell align="right">Monthly Repayment </TableCell>
            <TableCell align="right">Interest Paid </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
              <TableCell align="center">{row.terms}</TableCell>
              <TableCell align="right">{`$${row.monthly}`}</TableCell>
              <TableCell align="right">{`$${row.interest}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
