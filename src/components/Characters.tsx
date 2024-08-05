import { useGlobalContext } from "@/hooks/useGlobalContext.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Characters() {
  const { state, dispatch } = useGlobalContext();
  return (
    <section
      className={
        "flex h-fit w-full flex-col gap-2 bg-[#7554fc] p-2 text-lg tracking-wider text-white md:h-12 md:flex-row"
      }
    >
      <div className="flex w-full select-none items-center justify-center gap-5 px-10 md:w-[40%]">
        <p className={"text-nowrap text-center"}>First Character</p>
        <Select
          value={String(state.characterSelected[0])}
          onValueChange={(e) => {
            dispatch({
              type: "setCharacterSelected",
              payload: [Number(e), state.characterSelected[1]],
            });
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
          <SelectTrigger
            className={
              "w-full border-none bg-gradient-to-t from-black/10 to-black/10"
            }
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {state.characters.map((character, idx) => (
              <SelectItem key={"first" + idx} value={String(idx)}>
                {character}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className={"flex w-full items-center justify-center md:w-[20%]"}>
        <Tabs
          defaultValue="talk"
          className="w-3/4 md:w-full"
          onValueChange={(e) => {
            dispatch({
              type: "setMode",
              payload: e === "talk" ? 0 : 1,
            });
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
          <TabsList className="w-full">
            <TabsTrigger className={"w-1/2"} value="talk">
              Talk
            </TabsTrigger>
            <TabsTrigger className={"w-1/2"} value="roast">
              Roast
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex w-full select-none items-center justify-center gap-5 px-10 md:w-[40%]">
        <p className={"text-nowrap text-center"}>Second Character</p>
        <Select
          value={String(state.characterSelected[1])}
          onValueChange={(e) => {
            dispatch({
              type: "setCharacterSelected",
              payload: [state.characterSelected[0], Number(e)],
            });
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
          <SelectTrigger
            className={
              "w-full border-none bg-gradient-to-t from-black/10 to-black/10"
            }
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {state.characters.map((character, idx) => (
              <SelectItem key={"second" + idx} value={String(idx)}>
                {character}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
