import { useGlobalContext } from "@/hooks/useGlobalContext.tsx";
import { getCharacterText } from "@/services/LLM.tsx";
import { useRef } from "react";

export default function PlayGround() {
  const { state, dispatch } = useGlobalContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  return (
    <section
      className={
        "relative grid h-full w-full grid-cols-1 grid-rows-[5fr,1fr,5fr] place-content-center place-items-center gap-10 md:min-w-[1000px] md:grid-cols-[5fr,1fr,5fr] md:grid-rows-1"
      }
    >
      <div className="flex h-full w-full justify-start">
        <img
          src={`src/assets/${state.characters[state.characterSelected[0]]}.png`}
          alt={state.characters[state.characterSelected[0]]}
          className={"aspect-square w-1/2 self-end"}
        />
        {state.player === 1 && (
          <div
            className={`flex h-full w-1/2 flex-col items-start gap-5 pr-10 md:pt-40`}
          >
            <p className={"max-w-full rounded-3xl border-2 p-4 text-start"}>
              {state.textLoading ? "..." : state.characterHistory[0]}
            </p>
            {!state.audioLoading && (
              <div
                className={
                  "flex aspect-square cursor-pointer items-center justify-center self-end rounded-full border-2 p-4 hover:bg-slate-100"
                }
              >
                <p onClick={() => audioRef.current?.play()}>play</p>
                <audio
                  preload="auto"
                  controls={true}
                  className={"hidden"}
                  ref={audioRef}
                >
                  <source src={state.characterAudio} type="audio/wav" />
                </audio>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={"flex flex-row gap-5 md:flex-col"}>
        <button
          className={
            "aspect-square rounded-full border-2 p-5 font-bold tracking-widest hover:bg-slate-100"
          }
          onClick={() => {
            dispatch({
              type: "setPlayer",
              payload: state.player % 2 === 0 ? 1 : 2,
            });
            getCharacterText({ state, dispatch }, 0);
          }}
        >
          Talk
        </button>
        <button
          className={
            "aspect-square rounded-full border-2 p-5 font-bold tracking-widest hover:bg-slate-100"
          }
          onClick={() => {
            dispatch({
              type: "setPlayer",
              payload: state.player % 2 === 0 ? 1 : 2,
            });
            getCharacterText({ state, dispatch }, 1);
          }}
        >
          Rap
        </button>
      </div>

      <div className="flex h-full w-full justify-end">
        {state.player === 2 && (
          <div
            className={
              "flex h-full w-1/2 flex-col items-end gap-5 pl-10 md:pt-40"
            }
          >
            <p className={`max-w-full rounded-3xl border-2 p-4 text-end`}>
              {state.textLoading ? "..." : state.characterHistory[1]}
            </p>
            {!state.audioLoading && (
              <div
                className={
                  "flex aspect-square cursor-pointer items-center justify-center self-end rounded-full border-2 p-4 hover:bg-slate-100"
                }
              >
                <p onClick={() => audioRef.current?.play()}>play</p>
                <audio
                  preload="auto"
                  controls={true}
                  className={"hidden"}
                  ref={audioRef}
                >
                  <source src={state.characterAudio} type="audio/wav" />
                </audio>
              </div>
            )}
          </div>
        )}

        <img
          src={`src/assets/${state.characters[state.characterSelected[1]]}.png`}
          alt={state.characters[state.characterSelected[1]]}
          className={"aspect-square w-1/2 self-end"}
        />
      </div>
    </section>
  );
}
