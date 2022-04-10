import './index.css';
import { useEffect, useState } from 'react';
import { TextField } from "@mui/material";
import { Select, InputLabel, MenuItem, FormControl, Button } from '@mui/material';
import { currencyConverter } from '../../services/currency'
import { useNavigate } from 'react-router-dom';




const Converter = () => {
  const [rates, setRates] = useState([])
  const [currencyFrom, setCurrencyFrom] = useState('AED')
  const [currencyTo, setCurrencyTo] = useState('AMD')
  const [error, setError] = useState(false)

  const [result, setResult] = useState(0)
  const [amount, setAmount] = useState(0)

  const navigate = useNavigate()


  useEffect(() => {
    currencyConverter()
      .then(res => res.json())
      .then(
        (result) => {

          setRates(
            Object.fromEntries(
              Object.entries(result.rates).slice(0, 10)
            )
          )
        },
        (error) => {
          console.log(error);
        }
      )
  }, [])


  const changeAmount = (value) => {
    if ((value ^ 0) == value) {
      setError(false)
      setAmount(value)
      setResult(rates[currencyTo] * value)
    } else {
      setAmount(value)
      setError(true)
    }
  }

  const changeCurrencyTo = (value) => {
    setCurrencyTo(value)
    setResult(rates[value] * amount)
  }

  const changeCurrencyFrom = (value) => {
    currencyConverter(value).then(res => res.json())
      .then(
        (result) => {
          setRates( Object.fromEntries(
            Object.entries(result.rates).slice(0, 10)
          ))
          setResult(result.rates[currencyTo] * amount)
        },
        (error) => {
          console.log(error);
        }
      )
    setCurrencyFrom(value)
  }

  return (
    <div className="App">
      <div >
        <TextField
          value={amount}
          type='number'
          onChange={(e) => changeAmount(e.target.value)}
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          error={error}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">currency</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currencyFrom}
            label="currency"
            onChange={(e) => changeCurrencyFrom(e.target.value)}
          >
            {Object.entries(rates).map(([key]) =>
              <MenuItem value={key}>{key}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Output"
          variant="outlined"
          value={result}
          disabled={true}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">currency</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currencyTo}
            label="currency"
            onChange={(e) => changeCurrencyTo(e.target.value)}
          >
            {Object.entries(rates).map(([key]) =>
              <MenuItem value={key}>{key}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
      <Button onClick={() => navigate('/rate')} variant="contained">See exchange rates</Button>
    </div>
  );
}

export default Converter;
