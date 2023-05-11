import React from 'react';
import './ForexTable.css';

function ForexTable({ data }) {
  return (
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
        {data.map((event, index) => (
          <tr key={index}>
            <td>{event.Ccy}</td>
            <td>{event.Tenor}</td>
            <td>{event.Position}</td>
            <td>{event.Bid}</td>
            <td>{event.Ask}</td>
            <td>{event.QuoteStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ForexTable;
