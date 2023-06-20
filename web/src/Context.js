import { createContext, useState } from 'react';
export const Cart = createContext();

const Context = ({ children }) => {
  const [value,setValue] = useState(0);
  return (
    <Cart.Provider value={{value,setValue}}>
      {children}
    </Cart.Provider>
  )
}

export default Context;