import { useState } from "react";

function App() {

  const countries = [
    { name: 'India', value: 'IN', cities: ['Delhi', 'Mumbai', 'Bangalore'] },
    { name: 'United States', value: 'US', cities: ['New York', 'Los Angeles', 'Chicago'] },
    { name: 'United Kingdom', value: 'UK', cities: ['London', 'Manchester', 'Birmingham'] },
    { name: 'Canada', value: 'CA', cities: ['Toronto', 'Vancouver', 'Montreal'] },
    { name: 'Australia', value: 'AU', cities: ['Sydney', 'Melbourne', 'Brisbane'] },
    { name: 'Germany', value: 'DE', cities: ['Berlin', 'Munich', 'Frankfurt'] },
    { name: 'Japan', value: 'JP', cities: ['Tokyo', 'Osaka', 'Kyoto'] },
    { name: 'France', value: 'FR', cities: ['Paris', 'Lyon', 'Marseille'] }
];

  const [country, setCountry] = useState(0);

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
        {/* 1st drop down */}
        <label>
          <select onChange={(e) => { 
          setCountry(countries.find(c => c.name === e.target.value));
          // console.log(countries.find(c => c.name === e.target.value));
          }}>
            
            {countries.map((value, index) => {
              return (<option value={value.name}>{value.name}</option>)
            })}
          </select>
        </label>

         {/* 2nd drop down */}
         <label>
          <select>
            {country.cities?.map((value) => {
              return (<option>
                {value}
              </option>)
            })}
          </select>
         </label>
      </div>
    </>
  )
}

export default App
