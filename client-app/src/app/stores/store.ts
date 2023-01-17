import { createContext, useContext } from 'react';
import CitaStore from "./citaStore";

interface Store {
  citaStore: CitaStore
}

export const store: Store = {
  citaStore: new CitaStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}