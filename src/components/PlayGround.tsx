import { useGlobalContext } from "@/contexts/GlobalContextProvider.tsx";
import { getCharacterText } from "@/services/LLM.tsx";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button.tsx";
import { ReloadIcon, PlayIcon, PauseIcon } from "@radix-ui/react-icons";

export default function PlayGround() {
  const { state, dispatch } = useGlobalContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioControl, setAudioControl] = useState<boolean>(false);

  // quirky fix, use different stores
  /* eslint-disable */
  useEffect(() => {
    dispatch({ type: "setTextLoading", payload: true });
    dispatch({ type: "setAudioLoading", payload: true });
    getCharacterText(
      {
        state,
        dispatch,
      },
      state.mode,
    );
    setAudioControl(false);
  }, [state.player]);
  /* eslint-enable */

  return (
    <section
      className={`relative grid h-full w-full grid-cols-2 grid-rows-1 place-content-center place-items-center from-[#6d4e7c]/50 to-[#09090b] text-white ${state.player % 2 === 0 ? "bg-gradient-to-bl" : "bg-gradient-to-br"}`}
    >
      <div
        className={`group relative flex h-full w-full flex-col items-end justify-start gap-5 md:pt-10 ${state.player % 2 === 0 && "cursor-pointer"}`}
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
                  "h-full w-full max-w-full resize-none text-balance border-none p-5 text-center text-xl !ring-0 scrollbar-hide focus:ring-0 md:w-3/4"
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
                variant="link"
                className={
                  "select-none self-center rounded-3xl px-8 py-5 text-lg"
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
          style={{
            filter: `
            ${state.player % 2 === 0 ? "grayscale(100%)" : "grayscale(0%)"}
            drop-shadow(2px 2px 2px rgb(117, 87, 249))
            drop-shadow(-2px 0 2px rgb(117, 87, 249))
            drop-shadow(2px 2px 2px rgb(117, 87, 249))
            drop-shadow(-2px 2px 2px rgb(117, 87, 249))
            `,
          }}
          className={`pointer-events-none aspect-square w-full select-none self-center transition-transform duration-300 ease-in-out group-hover:scale-90 md:w-1/2 md:self-start md:group-hover:scale-125`}
        />
      </div>

      <div
        className={`group relative flex h-full w-full flex-col items-end justify-start gap-5 md:pt-10 ${state.player % 2 !== 0 && "cursor-pointer"}`}
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
                  "h-full w-full max-w-full resize-none text-balance border-none p-5 text-center text-xl !ring-0 scrollbar-hide focus:ring-0 md:w-3/4"
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
                variant="link"
                className={
                  "select-none self-center rounded-3xl px-8 py-5 text-lg"
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
          className={`pointer-events-none aspect-square w-full select-none self-center transition-transform duration-300 ease-in-out group-hover:scale-90 md:w-1/2 md:self-end md:group-hover:scale-125`}
          style={{
            filter: `
            ${state.player % 2 !== 0 ? "grayscale(100%)" : "grayscale(0%)"}
            drop-shadow(2px 2px 2px rgb(117, 87, 249))
            drop-shadow(-2px 2px 2px rgb(117, 87, 249))
            drop-shadow(2px 2px 2px rgb(117, 87, 249))
            drop-shadow(-2px 2px 2px rgb(117, 87, 249))
            `,
          }}
        />
      </div>
    </section>
  );
}
