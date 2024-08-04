import React, { createContext, useReducer } from "react";

interface GlobalContextState {
  characters: string[];
  characterSelected: [number, number];
  characterHistory: [string, string];
  play: 0 | 1 | 2;
  loading: boolean;
}

type GlobalContextAction =
  | {
      type: "setCharacterSelected";
      payload: GlobalContextState["characterSelected"];
    }
  | {
      type: "setCharacterHistory";
      payload: GlobalContextState["characterHistory"];
    }
  | { type: "setPlay"; payload: GlobalContextState["play"] }
  | { type: "setLoading"; payload: GlobalContextState["loading"] };

export interface GlobalContextType {
  state: GlobalContextState;
  //prettier-ignore
  dispatch: React.Dispatch<GlobalContextAction>;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

export function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(
    (
      prevState: GlobalContextState,
      action: GlobalContextAction,
    ): GlobalContextState => {
      switch (action.type) {
        case "setCharacterSelected":
          return { ...prevState, characterSelected: action.payload };
        case "setCharacterHistory":
          return { ...prevState, characterHistory: action.payload };

        case "setPlay":
          return { ...prevState, play: action.payload };
        case "setLoading":
          return { ...prevState, loading: action.payload };
        default:
          return prevState;
      }
    },
    {
      characters: [
        "Donald Trump",
        "Kamala Harris",
        "Peter Griffin",
        "Deadpool",
        "Wolverine",
      ],
      characterSelected: [0, 1],
      characterHistory: [
        "introduce yourself as character",
        "introduce yourself as character",
      ],
      play: 0,
      loading: false,
    },
  );

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
