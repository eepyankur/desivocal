import { useGlobalContext } from "@/hooks/useGlobalContext.tsx";
import { getCharacterText } from "@/services/LLM.tsx";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button.tsx";
import { ReloadIcon, PlayIcon, PauseIcon } from "@radix-ui/react-icons";

export default function PlayGround() {
  const { state, dispatch } = useGlobalContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioControl, setAudioControl] = useState<boolean>(false);

  // quirky, use different stores
  /* eslint-disable */
  useEffect(() => {
    getCharacterText(
      {
        state,
        dispatch,
      },
      state.mode,
    );
  }, [state.player]);
  /* eslint-enable */

  return (
    <section
      className={`relative grid h-full w-full grid-cols-2 grid-rows-1 place-content-center place-items-center from-[#6d4e7c]/50 to-[#09090b] text-white ${state.player % 2 === 0 ? "bg-gradient-to-r" : "bg-gradient-to-l"}`}
    >
      <div
        className={`group relative flex h-full w-full flex-col items-end justify-start gap-5 md:pt-10`}
        onClick={() => {
          if (state.player % 2 === 0) {
            dispatch({
              type: "setPlayer",
              payload: 1,
            });
          }
        }}
      >
        <div
          className={
            "flex h-full w-full flex-col items-center justify-center gap-2"
          }
        >
          {state.player === 1 && (
            <>
              <Textarea
                className={
                  "h-full w-full resize-none text-balance border-none p-5 text-center text-xl !ring-0 focus:ring-0"
                }
                value={state.textLoading ? "..." : state.characterHistory[0]}
                onChange={(e) => {
                  dispatch({
                    type: "setCharacterHistory",
                    payload: [e.target.value, state.characterHistory[1]],
                  });
                }}
              />
              <Button
                disabled={state.audioLoading}
                variant="ghost"
                className={
                  "select-none self-center rounded-3xl border-2 border-[#1b1b1b] bg-black px-8 py-5 text-lg hover:bg-[#1b1b1b]"
                }
                onClick={() => {
                  if (audioRef.current?.paused) audioRef.current?.play();
                  else audioRef.current?.pause();
                  setAudioControl((audioControl) => !audioControl);
                }}
              >
                <span className={"flex items-center justify-center gap-2"}>
                  Listen
                  {state.audioLoading ? (
                    <ReloadIcon className="animate-spin" />
                  ) : !audioControl ? (
                    <PlayIcon />
                  ) : (
                    <PauseIcon />
                  )}
                </span>
              </Button>
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
            </>
          )}
        </div>
        <img
          src={`./${state.characters[state.characterSelected[0]]}.png`}
          alt={state.characters[state.characterSelected[0]]}
          className={`transition-filter pointer-events-none aspect-square w-full select-none self-center duration-300 ease-in-out group-hover:scale-125 md:w-1/2 md:self-start`}
        />
      </div>

      <div
        className={`group relative flex h-full w-full flex-col items-end justify-start gap-5 md:pt-10`}
        onClick={() => {
          if (state.player % 2 !== 0) {
            dispatch({
              type: "setPlayer",
              payload: 2,
            });
          }
        }}
      >
        <div
          className={
            "flex h-full w-full flex-col items-center justify-center gap-2"
          }
        >
          {state.player === 2 && (
            <>
              <Textarea
                className={
                  "h-full w-full resize-none text-balance border-none p-5 text-center text-xl !ring-0 focus:ring-0"
                }
                value={state.textLoading ? "..." : state.characterHistory[1]}
                onChange={(e) => {
                  dispatch({
                    type: "setCharacterHistory",
                    payload: [state.characterHistory[0], e.target.value],
                  });
                }}
              />
              <Button
                disabled={state.audioLoading}
                variant="ghost"
                className={
                  "select-none self-center rounded-3xl border-2 border-[#1b1b1b] bg-black px-8 py-5 text-lg hover:bg-[#1b1b1b]"
                }
                onClick={() => {
                  if (audioRef.current?.paused) audioRef.current?.play();
                  else audioRef.current?.pause();
                  setAudioControl((audioControl) => !audioControl);
                }}
              >
                <span className={"flex items-center justify-center gap-2"}>
                  Listen
                  {state.audioLoading ? (
                    <ReloadIcon className="animate-spin" />
                  ) : !audioControl ? (
                    <PlayIcon />
                  ) : (
                    <PauseIcon />
                  )}
                </span>
              </Button>
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
            </>
          )}
        </div>
        <img
          src={`./${state.characters[state.characterSelected[1]]}.png`}
          alt={state.characters[state.characterSelected[1]]}
          className={`transition-filter pointer-events-none aspect-square w-full select-none self-center duration-300 ease-in-out group-hover:scale-125 md:w-1/2 md:self-end`}
        />
      </div>
    </section>
  );
}
