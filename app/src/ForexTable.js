// import React from 'react';
// import './ForexTable.css';

// function ForexTable({ data }) {
//   const getCellStyle = (quoteStatus) => {
//     let color;
//     switch (quoteStatus) {
//       case 'TRADABLE':
//         color = '#00A86B'; // Green color code
//         break;
//       case 'EXCEPTION':
//         color = '#E61030'; // Red color code
//         break;
//       case 'NON-TRADABLE':
//         color = '#FFA500'; // Orange color code
//         break;
//       default:
//         color = '#000000'; // Default color code
//         break;
//     }
//     return { backgroundColor: color, color: 'white' };
//   };
  

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Currency</th>
//           <th>Tenor</th>
//           <th>Position</th>
//           <th>Bid</th>
//           <th>Ask</th>
//           <th>Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((event, index) => (
//           <tr key={index}>
//             <td>{event.Ccy}</td>
//             <td>{event.Tenor}</td>
//             <td>{event.Position}</td>
//             <td>{event.Bid}</td>
//             <td>{event.Ask}</td>
//             <td style={getCellStyle(event.QuoteStatus)}>{event.QuoteStatus}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default ForexTable;



// import React, { useState, useEffect } from 'react';
// import './ForexTable.css';

// function ForexTable({ data }) {
//   const [filteredData, setFilteredData] = useState(data);
//   const [showNAPosition, setShowNAPosition] = useState(true);
//   const [showNABid, setShowNABid] = useState(true);
//   const [showNAAsk, setShowNAAsk] = useState(true);
//   const [statusFilter, setStatusFilter] = useState('');

//   useEffect(() => {
//     const filtered = data.filter((event) => {
//       const statusMatch = statusFilter === '' || event.QuoteStatus === statusFilter;
//       const showMatchPosition = showNAPosition || event.Position !== 'NA';
//       const showMatchBid = showNABid || event.Bid !== 'NA';
//       const showMatchAsk = showNAAsk || event.Ask !== 'NA';

//       return statusMatch && showMatchPosition && showMatchBid && showMatchAsk;
//     });

//     setFilteredData(filtered);
//   }, [data, statusFilter, showNAPosition, showNABid, showNAAsk]);

//   const getCellStyle = (quoteStatus) => {
//     let color;
//     switch (quoteStatus) {
//       case 'TRADABLE':
//         color = '#00A86B'; // Green color code
//         break;
//       case 'EXCEPTION':
//         color = '#E61030'; // Red color code
//         break;
//       case 'NON-TRADABLE':
//         color = '#FFA500'; // Orange color code
//         break;
//       default:
//         color = '#000000'; // Default color code
//         break;
//     }
//     return { backgroundColor: color, color: 'white' };
//   };

//   return (
//     <div>
//       <div className="filters">
//         <label>
//           Status:
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="">All</option>
//             <option value="TRADABLE">Tradable</option>
//             <option value="EXCEPTION">Exception</option>
//             <option value="NON-TRADABLE">Non-Tradable</option>
//           </select>
//         </label>
//         <label>
//           Position:
//           <select
//             value={showNAPosition ? 'all' : 'filtered'}
//             onChange={(e) => setShowNAPosition(e.target.value === 'all')}
//           >
//             <option value="all">All</option>
//             <option value="filtered">Filtered</option>
//           </select>
//         </label>
//         <label>
//           Bid:
//           <select
//             value={showNABid ? 'all' : 'filtered'}
//             onChange={(e) => setShowNABid(e.target.value === 'all')}
//           >
//             <option value="all">All</option>
//             <option value="filtered">Filtered</option>
//           </select>
//         </label>
//         <label>
//           Ask:
//           <select
//             value={showNAAsk ? 'all' : 'filtered'}
//             onChange={(e) => setShowNAAsk(e.target.value === 'all')}
//           >
//             <option value="all">All</option>
//             <option value="filtered">Filtered</option>
//           </select>
//         </label>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Currency</th>
//             <th>Tenor</th>
//             <th>Position</th>
//             <th>Bid</th>
//             <th>Ask</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((event, index) => (
//             <tr key={index}>
//               <td>{event.Ccy}</td>
//               <td>{event.Tenor}</td>
//               <td>{showNAPosition ? event.Position : event.Position !== 'NA' ? event.Position : ''}</td>
//               <td>{showNABid ? event.Bid : event.Bid !== 'NA' ? event.Bid : ''}</td>
//               <td>{showNAAsk ? event.Ask : event.Ask !== 'NA' ? event.Ask : ''}</td>
//               <td style={getCellStyle(event.QuoteStatus)}>{event.QuoteStatus}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
//           }

//           export default ForexTable;




import React, { useState, useEffect } from 'react';
import './ForexTable.css';

function ForexTable({ data }) {
  const [filteredData, setFilteredData] = useState(data);
  const [showNAPosition, setShowNAPosition] = useState(true);
  const [showNABid, setShowNABid] = useState(true);
  const [showNAAsk, setShowNAAsk] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const filtered = data.filter((event) => {
      const statusMatch = statusFilter === '' || event.QuoteStatus === statusFilter;
      const showMatchPosition = showNAPosition || event.Position !== 'NA';
      const showMatchBid = showNABid || event.Bid !== 'NA';
      const showMatchAsk = showNAAsk || event.Ask !== 'NA';

      return statusMatch && showMatchPosition && showMatchBid && showMatchAsk;
    });

    setFilteredData(filtered);
  }, [data, statusFilter, showNAPosition, showNABid, showNAAsk]);

  const getCellStyle = (quoteStatus) => {
    let color;
    switch (quoteStatus) {
      case 'TRADABLE':
        color = '#00A86B'; // Green color code
        break;
      case 'EXCEPTION':
        color = '#E61030'; // Red color code
        break;
      case 'NON-TRADABLE':
        color = '#FFA500'; // Orange color code
        break;
      default:
        color = '#000000'; // Default color code
        break;
    }
    return { backgroundColor: color, color: 'white' };
  };

  return (
    <div>
      <div className="filters">
        <label className="filter-label">
          Status: 
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="TRADABLE">Tradable</option>
            <option value="EXCEPTION">Exception</option>
            <option value="NON-TRADABLE">Non-Tradable</option>
          </select>
        </label>
        <label className="filter-label">
          Position:
          <select
            className="filter-select"
            value={showNAPosition ? 'all' : 'filtered'}
            onChange={(e) => setShowNAPosition(e.target.value === 'all')}
          >
            <option value="all">All</option>
            <option value="filtered">Filtered</option>
          </select>
        </label>
        <label className="filter-label">
          Bid:
          <select
            className="filter-select"
            value={showNABid ? 'all' : 'filtered'}
            onChange={(e) => setShowNABid(e.target.value === 'all')}
          >
            <option value="all">All</option>
            <option value="filtered">Filtered</option>
          </select>
        </label>
        <label className="filter-label">
          Ask:
          <select
            className="filter-select"
            value={showNAAsk ? 'all' : 'filtered'}
            onChange={(e) => setShowNAAsk(e.target.value === 'all')}
          >
            <option value="all">All</option>
            <option value="filtered">Filtered</option>
          </select>
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Tenor</th>
            <th>Position</th>
            <th>Bid</th>
            <th>Ask</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((event, index) => (
            <tr key={index}>
              <td>{event.Ccy}</td>
              <td>{event.Tenor}</td>
              <td>{showNAPosition ? event.Position : event.Position !== 'NA' ? event.Position : ''}</td>
              <td>{showNABid ? event.Bid : event.Bid !== 'NA' ? event.Bid : ''}</td>
              <td>{showNAAsk ? event.Ask : event.Ask !== 'NA' ? event.Ask : ''}</td>
              <td style={getCellStyle(event.QuoteStatus)}>{event.QuoteStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
          }
          export default ForexTable;
