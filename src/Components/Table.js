import React from 'react'
import './Table.css'
function Table(props) {
    return (
       <div className="table__container">
           { props.countries ?
            props.countries.map(country=>(
                <tr className="table__row">
                    <td>{country.country}</td>
                    <td><strong>{country.cases}</strong></td>
                </tr>
             ))
             :
             <h2>Loading</h2>   
        
        }
           
       </div>
    )
}
export default Table;
