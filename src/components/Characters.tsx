import { useGlobalContext } from "@/hooks/useGlobalContext.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Characters() {
  const { state, dispatch } = useGlobalContext();

  return (
    <section className={"flex w-full items-center justify-center p-2"}>
      <div
        className={
          "flex w-1/2 flex-col items-center justify-center gap-5 md:flex-row"
        }
      >
        <p className={"select-none text-nowrap text-center"}>First Character</p>
        <Select
          value={String(state.characterOne)}
          onValueChange={(e) =>
            dispatch({ type: "setCharacterOne", payload: Number(e) })
          }
        >
          <SelectTrigger>
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
        <p className={"select-none text-nowrap text-center"}>
          Second Character
        </p>
        <Select
          value={String(state.characterTwo)}
          onValueChange={(e) =>
            dispatch({ type: "setCharacterTwo", payload: Number(e) })
          }
        >
          <SelectTrigger>
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
