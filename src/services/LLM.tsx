import { GoogleGenerativeAI } from "@google/generative-ai";
import { GlobalContextType } from "@/contexts/GlobalContextProvider.tsx";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function getConversationText({
  state,
  dispatch,
}: GlobalContextType) {
  dispatch({
    type: "setLoading",
    payload: true,
  });
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `Do roleplay. Output must be short (2 lines), concise and funny. You are ${state.characters[state.characterSelected[state.play % 2 === 0 ? 0 : 1]]} and you are talking to ${state.characters[state.characterSelected[state.play % 2 === 0 ? 1 : 0]]}. `,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `${state.characterHistory[state.characterSelected[state.play % 2 === 0 ? 0 : 1]]}`,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const msg = `${state.characterHistory[state.play % 2 === 0 ? 1 : 0]}`;

  try {
    const result = await chat.sendMessage(msg);
    const response = result.response;
    const text = response.text();
    dispatch({
      type: "setCharacterHistory",
      payload:
        state.play % 2 === 0
          ? [text, state.characterHistory[1]]
          : [state.characterHistory[0], text],
    });
    dispatch({
      type: "setLoading",
      payload: false,
    });
    console.log(text);
  } catch (error) {
    console.error(error);
    console.error("Generating new response");
    getConversationText({ state, dispatch });
  }
}
