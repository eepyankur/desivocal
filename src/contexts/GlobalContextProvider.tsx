import React, { createContext, useReducer } from "react";

interface GlobalContextState {
  characters: string[];
  characterOne: number;
  characterTwo: number;
}

type GlobalContextAction =
  | { type: "setCharacterOne"; payload: number }
  | { type: "setCharacterTwo"; payload: number };

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
        case "setCharacterOne":
          return { ...prevState, characterOne: action.payload };
        case "setCharacterTwo":
          return { ...prevState, characterTwo: action.payload };
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
      characterOne: 0,
      characterTwo: 1,
    },
  );

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
