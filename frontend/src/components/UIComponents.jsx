import React from "react";

// Other small UI components can go here

export const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export const TextInput = ({ value, onChange }) => {
  return <input type="text" value={value} onChange={onChange} />;
};

// ShoppingCart component
export const ShoppingCart = ({ cartItems }) => {
  return (
    <div>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.title} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ... more UI components
