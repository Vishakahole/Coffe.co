import React from 'react';

const Grid = ({ cartItems }) => {
  return (
    <div className="grid">
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            <h4>{item.name}</h4>
            <p>Price: ${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Grid;