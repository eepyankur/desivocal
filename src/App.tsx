import Characters from "@/components/Characters.tsx";
import PlayGround from "@/components/PlayGround.tsx";

function App() {
  return (
    <main
      className={
        "flex h-dvh min-h-[500px] w-full flex-col overflow-hidden bg-[#09090b] font-jetBrainsMono"
      }
    >
      <Characters />
      <PlayGround />
    </main>
  );
}

export default App;
