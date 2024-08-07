import React, { createContext, useContext, useReducer } from "react";

interface GlobalContextState {
  characters: string[];
  characterSelected: [number, number];
  characterHistory: [string, string];
  player: 0 | 1 | 2;
  textLoading: boolean;
  audioLoading: boolean;
  characterAudio: string;
  mode: 0 | 1;
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
  | { type: "setPlayer"; payload: GlobalContextState["player"] }
  | { type: "setTextLoading"; payload: GlobalContextState["textLoading"] }
  | { type: "setAudioLoading"; payload: GlobalContextState["audioLoading"] }
  | {
      type: "setCharacterAudio";
      payload: GlobalContextState["characterAudio"];
    }
  | { type: "setMode"; payload: GlobalContextState["mode"] };

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
        case "setPlayer":
          return { ...prevState, player: action.payload };
        case "setTextLoading":
          return { ...prevState, textLoading: action.payload };
        case "setAudioLoading":
          return { ...prevState, audioLoading: action.payload };
        case "setCharacterAudio":
          return { ...prevState, characterAudio: action.payload };
        case "setMode":
          return { ...prevState, mode: action.payload };
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
      player: 0,
      textLoading: false,
      audioLoading: false,
      characterAudio: "",
      mode: 0,
    },
  );

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext(): GlobalContextType {
  const context = useContext(GlobalContext);
  if (context === null) throw new Error("Global context is undefined");

  return context;
}
