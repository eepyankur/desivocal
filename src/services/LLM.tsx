import { GoogleGenerativeAI } from "@google/generative-ai";
import { GlobalContextType } from "@/contexts/GlobalContextProvider.tsx";
import { getCharacterAudio } from "@/services/TTS.tsx";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export function getCharacterText(
  { state, dispatch }: GlobalContextType,
  prompt: number,
) {
  if (state.player === 0) return;

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `${prompt === 0 ? "Do role play. Output must be of 2 lines and concise." : "Do rap roasting battle. Output must be single liners, witty and rhyming."} You are ${state.characters[state.characterSelected[state.player % 2 !== 0 ? 0 : 1]]} and you are ${prompt === 0 ? "talking to" : "roasting"} ${state.characters[state.characterSelected[state.player % 2 !== 0 ? 1 : 0]]}.`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `${state.characterHistory[state.characterSelected[state.player % 2 === 0 ? 0 : 1]]}`,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const msg = `${state.characterHistory[state.player % 2 !== 0 ? 1 : 0]}`;

  (async () => {
    try {
      dispatch({
        type: "setTextLoading",
        payload: true,
      });
      dispatch({
        type: "setAudioLoading",
        payload: true,
      });
      const result = await chat.sendMessage(msg);
      const response = result.response;
      const text = response.text();
      dispatch({
        type: "setCharacterHistory",
        payload:
          state.player % 2 !== 0
            ? [text, state.characterHistory[1]]
            : [state.characterHistory[0], text],
      });
      dispatch({
        type: "setTextLoading",
        payload: false,
      });
      const audio = await getCharacterAudio(text);
      dispatch({ type: "setCharacterAudio", payload: audio });
      dispatch({
        type: "setAudioLoading",
        payload: false,
      });
    } catch (error) {
      console.error(error);
      console.error("Generating new response");
      getCharacterText({ state, dispatch }, prompt);
    }
  })();
}
