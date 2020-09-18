import { createContext, useContext, createElement as e } from 'react';

const ControllerLayerContext = createContext(null);

export function ControllerLayer({value, children}) {
  return e(ControllerLayerContext.Provider, {value}, children);
}

export function useController() {
  return useContext(ControllerLayerContext);
}
