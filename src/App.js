import './App.css';
import {FormControl,Select,MenuItem,CardContent,Card} from '@material-ui/core/'
import { useState,useEffect } from 'react';
import Map from './Components/Map';
import InfoBox from './Components/InfoBox';
import Table from './Components/Table'


function App() {
  const [dropdownContries, setdropdownContries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState('')
const [tableData, setTableData] = useState('')


  useEffect(()=>(
      fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => setCountryInfo(data))
  ),[])
  

  const OncountryChange = async(e) =>
        {
        const countryCode = e.target.value
        const url = countryCode === 'worldwide' ? 
                                    'https://disease.sh/v3​/covid-19​/all':
                                    `https://disease.sh/v3/covid-19/countries/${countryCode}`

        await fetch(url)
        .then(response =>(
        response.json()))
        .then(data=>
              {
              setCountry(countryCode)
              setCountryInfo(data)
              
              }
           )
        console.log(countryInfo)
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
            setTableData(data)
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
                    <Select value={country} variant="outlined" onChange={OncountryChange}>
                      <MenuItem value='worldwide'>Worldwide</MenuItem>

                      {dropdownContries.map((country,index)=>(
                      <MenuItem  index={country.value} value={country.value}>{country.name}</MenuItem>
                      ))}

                    </Select>
                </FormControl>
            </div>

            <div className="app__infoBox_container">

            
              {/* Infected */}
              <InfoBox  title='Infected cases' no_of_cases ={countryInfo.cases} total={countryInfo.cases} />
              {/* Recovered */}
              <InfoBox  title='Recovered Cases' no_of_cases ={countryInfo.todayRecovered} total={countryInfo.recovered} />

              {/* Deaths */}
              <InfoBox  title='Deaths' no_of_cases ={countryInfo.todayDeaths} total={countryInfo.deaths} />
            </div>
            

            {/* Map Component */}    
            <Map>

            </Map>
          </div>

          <Card className="app__right_container">
              <CardContent>
               <h3>Live Cases by Country </h3>
               <Table countries={tableData}/>

               <h3>Worldwide New Cases </h3>
                // Graph
              </CardContent>
          </Card>
       
    </div>
    

  );
}

export default App;
