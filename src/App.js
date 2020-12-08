import './App.css';
import {FormControl,Select,MenuItem,CardContent,Card} from '@material-ui/core/'
import { useState,useEffect } from 'react';
import Map from './Components/Map';
import InfoBox from './Components/InfoBox';

function App() {
  const [dropdownContries, setdropdownContries] = useState([])
  const [country, setcountry] = useState('worldwide')
  const [stats, setstats] = useState([])

  const countryChange = (e) =>{
    setcountry(e.target.value)
  }

  useEffect(() => {

    const getCountriesData = async ()=>{

       fetch("https://disease.sh/v3/covid-19/countries")
            .then((response)=>response.json())
            .then((data)=>{
              const countries = data.map((country)=>(
               {
                  name : country.country,
                  value : country.countryInfo.iso2
                }
            ));
            setdropdownContries(countries)

            })
    }
    getCountriesData();
  },[])

  return (
    <div className="App">
          <div className="app__left_container">
          
            <div className="app__header_container">
                <h1 className='app__heading'> Covid - Visualizer </h1>
                {/* Dropdownbox */}
                <FormControl className='app__dropdown'>
                    <Select value={country} variant="outlined" onChange={countryChange}>
                      <MenuItem value='worldwide'>Worldwide</MenuItem>

                      {dropdownContries.map((country,index)=>(
                      <MenuItem  index={country.value} value={country.value}>{country.name}</MenuItem>
                      ))}

                    </Select>
                </FormControl>
            </div>

            <div className="app__infoBox_container">

            
              {/* Infected */}
              <InfoBox  title='Infected cases' no_of_cases ={stats[0]} total={1.23} />
              {/* Recovered */}
              <InfoBox  title='Recovered Cases' no_of_cases ={stats[1]} total={1.23} />

              {/* Deaths */}
              <InfoBox  title='Deaths' no_of_cases ={stats[2]} total={1.23} />
            </div>
            

            {/* Map Component */}    
            <Map>

            </Map>
          </div>

          <Card className="app__right_container">
              <CardContent>
                TAble
                Graph
              </CardContent>
          </Card>
       
    </div>
    

  );
}

export default App;
