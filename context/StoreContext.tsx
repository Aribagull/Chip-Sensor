import { createContext, useContext, useState, useEffect } from "react";
import { getMyStores } from '../Api/Stores/store';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyStores().then((res) => {
      setStores(res.stores);
      setLoading(false);
    });
  }, []);

  return (
    <StoreContext.Provider value={{ stores, loading }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStores = () => useContext(StoreContext);
