import { useContext } from "react";
import {
  type GlobalContextType,
  GlobalContext,
} from "@/contexts/GlobalContextProvider.tsx";

export function useGlobalContext(): GlobalContextType {
  const context = useContext(GlobalContext);
  if (context === null) throw new Error("Global context is undefined");

  return context;
}
