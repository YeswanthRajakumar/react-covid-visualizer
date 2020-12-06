import './App.css';
import {FormControl,Select,MenuItem} from '@material-ui/core/'
import { useState,useEffect } from 'react';

import InfoBox from './Components/InfoBox'

function App() {
  const [dropdownContries, setdropdownContries] = useState(['America','Russia','India'])
  const [country, setcountry] = useState('worldwide')
  const countryChange = (e) =>{
    setcountry(e.target.value)
  }
  return (
    <div className="App">
      <div className="app__header_container">
        <h1 className='app__heading'> Covid - Visualizer </h1>
        {/* Dropdownbox */}
        <FormControl className='app__dropdown'>
            <Select value={country} variant="outlined" onChange={countryChange}>
              <MenuItem value={country}>Worldwide</MenuItem>
              {dropdownContries.map(country =>(
              <MenuItem value={country}>{country}</MenuItem>
              ))}
            </Select>
        </FormControl>
     </div>

    <div className="app_infoBox">
      {/* Infected */}
      <InfoBox  title='Infected' no_of_cases ={2000} total={1.23} />
      {/* Recovered */}
      <InfoBox  title='Recovered' no_of_cases ={2000} total={1.23} />

      {/* Deaths */}
      <InfoBox  title='Deaths' no_of_cases ={2000} total={1.23} />


    </div>

    </div>
  );
}

export default App;
