import { useGlobalContext } from "@/hooks/useGlobalContext.tsx";
import { getCharacterText } from "@/services/LLM.tsx";
import { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function PlayGround() {
  const { state, dispatch } = useGlobalContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [mode, setMode] = useState<number>(0);

  return (
    <section
      className={
        "relative grid h-full w-full grid-cols-1 grid-rows-[5fr,1fr,5fr] place-content-center place-items-center gap-10 md:min-w-[1000px] md:grid-cols-[5fr,1fr,5fr] md:grid-rows-1"
      }
    >
      <div className="flex h-full w-full justify-start">
        <img
          src={`./${state.characters[state.characterSelected[0]]}.png`}
          alt={state.characters[state.characterSelected[0]]}
          className={"aspect-square w-1/2 self-end"}
        />
        {state.player === 1 && (
          <div
            className={`flex h-full w-1/2 flex-col items-start gap-5 pr-10 md:pt-40`}
          >
            <Textarea
              className={"h-1/2 max-w-full rounded-3xl border-2 p-4 text-start"}
              value={state.textLoading ? "..." : state.characterHistory[0]}
              onChange={(e) => {
                dispatch({
                  type: "setCharacterHistory",
                  payload: [e.target.value, state.characterHistory[1]],
                });
              }}
            />
            <div
              className={
                "flex aspect-square cursor-pointer items-center justify-center self-end rounded-full border-2 p-4 hover:bg-slate-100"
              }
              onClick={() => audioRef.current?.play()}
            >
              <p>{state.audioLoading ? "..." : "tts"}</p>
              {!state.audioLoading && (
                <audio
                  preload="auto"
                  controls={true}
                  className={"hidden"}
                  ref={audioRef}
                >
                  <source src={state.characterAudio} type="audio/wav" />
                </audio>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={"flex flex-row gap-5 md:flex-col"}>
        <Select
          value={String(mode)}
          onValueChange={(e) => {
            setMode(Number(e));
            dispatch({
              type: "setPlayer",
              payload: 0,
            });
            dispatch({
              type: "setCharacterHistory",
              payload: [
                "introduce yourself as character",
                "introduce yourself as character",
              ],
            });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Mode"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"0"}>Talk</SelectItem>
            <SelectItem value={"1"}>Roast</SelectItem>
          </SelectContent>
        </Select>

        <button
          className={
            "aspect-square rounded-full border-2 p-5 font-bold tracking-widest hover:bg-slate-100"
          }
          onClick={() => {
            dispatch({
              type: "setPlayer",
              payload: state.player % 2 === 0 ? 1 : 2,
            });
            getCharacterText(
              {
                state,
                dispatch,
              },
              mode,
            );
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
            <path
              fill="none"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M.5 7h10M7 10.5L10.5 7L7 3.5m6.5 0v7"
            />
          </svg>
        </button>
      </div>

      <div className="flex h-full w-full justify-end">
        {state.player === 2 && (
          <div
            className={
              "flex h-full w-1/2 flex-col items-end gap-5 pl-10 md:pt-40"
            }
          >
            <Textarea
              className={"h-1/2 max-w-full rounded-3xl border-2 p-4 text-start"}
              value={state.textLoading ? "..." : state.characterHistory[1]}
              onChange={(e) => {
                dispatch({
                  type: "setCharacterHistory",
                  payload: [state.characterHistory[0], e.target.value],
                });
              }}
            />
            <div
              className={
                "flex aspect-square cursor-pointer items-center justify-center self-end rounded-full border-2 p-4 hover:bg-slate-100"
              }
              onClick={() => audioRef.current?.play()}
            >
              <p>{state.audioLoading ? "..." : "tts"}</p>
              {!state.audioLoading && (
                <audio
                  preload="auto"
                  controls={true}
                  className={"hidden"}
                  ref={audioRef}
                >
                  <source src={state.characterAudio} type="audio/wav" />
                </audio>
              )}
            </div>
          </div>
        )}

        <img
          src={`./${state.characters[state.characterSelected[1]]}.png`}
          alt={state.characters[state.characterSelected[1]]}
          className={"aspect-square w-1/2 self-end"}
        />
      </div>
    </section>
  );
}
