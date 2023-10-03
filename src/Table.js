import React from 'react';

const Table = ({ response }) => {
  return (
    <table className="data-table">
    <thead>
      <tr>
        <th>Adult Age</th>
        <th>Amount (Discount)</th>
        <th>Child</th>
      </tr>
    </thead>
    <tbody>
      {response.adult.map((item, index) => (
        <tr key={item.age}>
          <td>{item.age}</td>
          <td>{item.adult} {item.discount && <span> After Discount ({item.discount})</span>}</td>
          {index === 0 && <td rowSpan={response.adult.length}>{response.child}</td>}
        </tr>
      ))}
      <tr>
        <td colSpan="3" style={{ textAlign: "center" }}>
          Total Cost - {response.total_cost}
        </td>
      </tr>
    </tbody>
  </table>

  );
};

export default Table;
