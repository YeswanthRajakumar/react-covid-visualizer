import React, { useEffect, useState } from 'react'
import {Line} from 'react-chartjs-2';
import numeral from 'numeral'

function LineGraph({casesType='cases'}) {
    const [data, setData] = useState({})
    
const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: true,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            parser: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };
  
  


    const buildChartData = (data,casesType='cases')=>{
        const chartData = [];
        console.log(chartData)
        let lastDataPoint;

        for(let date in data.cases){
            if (lastDataPoint){
                const newDataPoint = {
                    x :date,
                    y :data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
        
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }

    useEffect(()=>{
        const fetchData = async ()=>
        {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response=>(
             response.json()))
             .then(data=>{
               const chartData = buildChartData(data) 
               setData(chartData)
            //    console.log(chartData)
             })
        }
        fetchData();
      
     },[casesType])
 

    return (
        <div style={{marginTop:'30px'}}>
            {data?.length > 0 && (
                 <Line
                 options={options}
                 data={{
                     datasets:[{
                          backgroundColor : '#e58a8a',
                          borderColor:'#347ABB',
                          data:data
                      }]
                     }}
                
                 /> 
            )}
           Graph
        </div>
    )
}

export default LineGraph
