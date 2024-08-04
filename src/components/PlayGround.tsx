import { useGlobalContext } from "@/hooks/useGlobalContext.tsx";
import { getConversationText } from "@/services/LLM.tsx";

export default function PlayGround() {
  const { state, dispatch } = useGlobalContext();

  return (
    <section
      className={
        "relative flex h-full w-full flex-col items-center justify-center bg-red-50 md:flex-row"
      }
    >
      <button
        className={
          "absolute aspect-square rounded-full border-2 border-red-950 p-5 font-bold tracking-widest"
        }
        onClick={() => {
          dispatch({ type: "setPlay", payload: state.play % 2 === 0 ? 1 : 2 });
          getConversationText({ state, dispatch });
        }}
      >
        Talk
      </button>
      <div className="flex h-full w-full justify-start">
        <img
          src={`src/assets/${state.characters[state.characterSelected[0]]}.png`}
          alt={state.characters[state.characterSelected[0]]}
          className={"aspect-square w-1/2 self-end"}
        />
        <div className={"mr-10 flex h-full items-start overflow-auto md:pt-40"}>
          <p
            className={`w-full rounded-3xl border-2 p-4 text-start ${state.play !== 1 && "invisible"}`}
          >
            {state.loading ? "..." : state.characterHistory[0]}
          </p>
        </div>
      </div>
      <div className="flex h-full w-full justify-end">
        <div
          className={
            "ml-10 flex h-full items-end overflow-auto md:items-start md:pt-40"
          }
        >
          <p
            className={`w-full rounded-3xl border-2 p-4 text-end ${state.play !== 2 && "invisible"}`}
          >
            {state.loading ? "..." : state.characterHistory[1]}
          </p>
        </div>
        <img
          src={`src/assets/${state.characters[state.characterSelected[1]]}.png`}
          alt={state.characters[state.characterSelected[1]]}
          className={"aspect-square w-1/2 self-end"}
        />
      </div>
    </section>
  );
}
