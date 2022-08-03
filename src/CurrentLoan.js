import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, amount, terms, monthly, interest) {
  return { id, date, name, amount, terms, monthly, interest };
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
    2,
    '19 Jan, 2022',
    'HSBC',
    100000,
    12,
    9699,
    6034.42,
  ),
  createData(
    3,
    '26 April, 2022',
    'HSBC',
    300000,
    6,
    62030,
    7230.21,
  ),

];

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function totalInterest(items) {
  return items.map(({ interest }) => interest).reduce((sum, i) => sum + i, 0);
}
function totalMonthly(items) {
  return items.map(({ monthly }) => monthly).reduce((sum, i) => sum + i, 0);
}

function preventDefault(event) {
  event.preventDefault();
}

export default function CurrentLoan() {

  const totalInterestPaid = totalInterest(rows);
  const totalMonthlyPayment = totalMonthly(rows);
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

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={4}>Total Interest</TableCell>
            <TableCell align="right">${ccyFormat(totalInterestPaid)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>Monthly Repayment</TableCell>
            <TableCell align="right">${ccyFormat(totalMonthlyPayment)}</TableCell>
          </TableRow>

        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}


// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// const TAX_RATE = 0.07;

// function ccyFormat(num) {
//   return `${num.toFixed(2)}`;
// }

// function priceRow(qty, unit) {
//   return qty * unit;
// }

// function createRow(desc, qty, unit) {
//   const price = priceRow(qty, unit);
//   return { desc, qty, unit, price };
// }

// function subtotal(items) {
//   return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
// }

// const rows = [
//   createRow('Paperclips (Box)', 100, 1.15),
//   createRow('Paper (Case)', 10, 45.99),
//   createRow('Waste Basket', 2, 17.99),
// ];

// const invoiceSubtotal = subtotal(rows);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;

// export default function SpanningTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="spanning table">
//         <TableHead>
//           <TableRow>
//             <TableCell align="center" colSpan={3}>
//               Details
//             </TableCell>
//             <TableCell align="right">Price</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell>Desc</TableCell>
//             <TableCell align="right">Qty.</TableCell>
//             <TableCell align="right">Unit</TableCell>
//             <TableCell align="right">Sum</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.desc}>
//               <TableCell>{row.desc}</TableCell>
//               <TableCell align="right">{row.qty}</TableCell>
//               <TableCell align="right">{row.unit}</TableCell>
//               <TableCell align="right">{ccyFormat(row.price)}</TableCell>
//             </TableRow>
//           ))}

//           <TableRow>
//             <TableCell rowSpan={3} />
//             <TableCell colSpan={2}>Subtotal</TableCell>
//             <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell>Tax</TableCell>
//             <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
//             <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell colSpan={2}>Total</TableCell>
//             <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
