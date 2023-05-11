// import React, { useEffect, useState } from 'react';
// import './App.css';
// import ForexTable from './ForexTable';

// function App() {
//   const [data, setData] = useState([]);

//   // Replace the URL with the actual endpoint
//   useEffect(() => {
//     fetch('https://your-api-endpoint.com')
//       .then(response => response.json())
//       .then(json => setData(json))
//       .catch(err => console.error('Error fetching data', err));
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Forex Exchange</h1>
//       </header>
//       <ForexTable data={data} />
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import './App.css';
// import ForexTable from './ForexTable';
// import BoALogo from './boa_logo.png'; // Assuming your logo is in src folder

// function App() {
//   const data = [
//     {
//       "EventId": 3,
//       "Ccy": "GBX",
//       "Tenor": "1M",
//       "Position": "NA",
//       "Bid": "NA",
//       "Ask": "NA",
//       "QuoteStatus": "EXCEPTION"
//     },
//     {
//       "EventId": 91,
//       "Ccy": "GBX",
//       "Tenor": "2M",
//       "Position": "NA",
//       "Bid": "NA",
//       "Ask": "NA",
//       "QuoteStatus": "EXCEPTION"
//     }
//   ];

//   return (
//     <div className="App">
//       <div className="header-container">
//         <img className="logo" src={BoALogo} alt="Bank of America Logo" />
//       </div>
//       <ForexTable data={data} />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import ForexTable from './ForexTable';
import BoALogo from './boa_logo.png'; // Assuming your logo is in src folder

function App() {
  const data = [
    {
      "EventId": 5,
      "Ccy": "CHX",
      "Tenor": "1M",
      "Position": -3000,
      "Bid": "NA",
      "Ask": "NA",
      "QuoteStatus": "EXCEPTION"
    },
    {
        "EventId": 25,
        "Ccy": "GBX",
        "Tenor": "1M",
        "Position": 100,
        "Bid": 0.7996,
        "Ask": 0.7997,
        "QuoteStatus": "TRADABLE"
    },
    {
        "EventId": 20,
        "Ccy": "GBX",
        "Tenor": "1M",
        "Position": "NA",
        "Bid": "NA",
        "Ask": "NA",
        "QuoteStatus": "EXCEPTION"
    },
    {
        "EventId": 66,
        "Ccy": "JPX",
        "Tenor": "12M",
        "Position": 999900,
        "Bid": -11.7856,
        "Ask": -11.7854,
        "QuoteStatus": "NON-TRADABLE"
    },
    {
        "EventId": 3,
        "Ccy": "GBX",
        "Tenor": "1M",
        "Position": "NA",
        "Bid": "NA",
        "Ask": "NA",
        "QuoteStatus": "EXCEPTION"
    },
    {
        "EventId": 91,
        "Ccy": "GBX",
        "Tenor": "2M",
        "Position": "NA",
        "Bid": "NA",
        "Ask": "NA",
        "QuoteStatus": "EXCEPTION"
    },
    {
        "EventId": 3,
        "Ccy": "EUX",
        "Tenor": "6M",
        "Position": "NA",
        "Bid": "NA",
        "Ask": "NA",
        "QuoteStatus": "EXCEPTION"
    },
    {
        "EventId": 99,
        "Ccy": "JPX",
        "Tenor": "12M",
        "Position": 999900,
        "Bid": 24.4107,
        "Ask": 24.411,
        "QuoteStatus": "NON-TRADABLE"
    },
    {
        "EventId": 89,
        "Ccy": "CHX",
        "Tenor": "2M",
        "Position": -2000,
        "Bid": 0.8928,
        "Ask": 0.8929,
        "QuoteStatus": "TRADABLE"
    }
  ];

  return (
    <div className="App">
      <div className="logo-header-container">
          <img className="logo" src={BoALogo} alt="Bank of America Logo" />
      </div>
      <div className="header-container">
        <div className="header-title">Forex Exchange</div>
      </div>
      <div className="forex-table">
        <ForexTable data={data} />
      </div>
    </div>
  );
}

export default App;


