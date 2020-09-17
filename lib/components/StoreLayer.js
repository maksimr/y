import { createContext, useContext, useEffect, useState, createElement as e } from 'react';

const StoreLayerContext = createContext(null);

export function StoreLayer({store, children}) {
  return e(StoreLayerContext.Provider, {value: store}, children);
}

export function useStore(fn) {
  const store = useContext(StoreLayerContext);
  const [value, setValue] = useState(fn ? fn(store.value) : store.value);
  useEffect(() => {
    return store.addListener((state) => setValue(fn ? fn(state) : state));
  }, [store, fn]);
  return [value, store.swap];
}