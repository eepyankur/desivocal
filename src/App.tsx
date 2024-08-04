import Characters from "@/components/Characters.tsx";
import PlayGround from "@/components/PlayGround.tsx";

function App() {
  return (
    <main className={"flex h-dvh w-full flex-col font-jetBrainsMono"}>
      <Characters />
      <PlayGround />
    </main>
  );
}

export default App;
