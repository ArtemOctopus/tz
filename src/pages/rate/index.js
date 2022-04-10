import './index.css';
import { useEffect, useState } from 'react';
import { currencyConverter } from '../../services/currency'
import { Select, InputLabel, MenuItem, FormControl, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';


const Rate = () => {
  const [rates, setRates] = useState([])
  const [currency, setCurrency] = useState('AED')

  const navigate = useNavigate()

  useEffect(() => {
    currencyConverter()
      .then(res => res.json())
      .then(
        (result) => {
          setRates(Object.entries(result.rates).slice(0, 10)
          )
        },
        (error) => {
          console.log(error);
        }
      )
  }, [])

  const changeCurrency = (value) => {
    currencyConverter(value).then(res => res.json())
      .then(
        (result) => {
          setRates( 
            Object.entries(result.rates).slice(0, 10)
          )
        },
        (error) => {
          console.log(error);
        }
      )
      setCurrency(value)
  }

  return (
    <div className="pd-10 rate">
      <Button variant="contained" onClick={() => navigate('/')}>Back</Button>

      <FormControl>
        <InputLabel id="demo-simple-select-label">currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          label="currency"
          onChange={(e) => changeCurrency(e.target.value)}
        >
          {rates.map((el) =>
            <MenuItem value={el[0]}>{el[0]}</MenuItem>)}
        </Select>
      </FormControl>
      <div className='pd-10'>Selected currency: {currency}</div>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rates.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row[0]}
                </TableCell>
                <TableCell align="right">{row[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Rate;
