import "./App.css";
import ModuleGrid from "./modules/4ModuleGrid.tsx";
import { modules } from "./modules/2struct_modules.tsx";

function App() {
  return (
    <main className="container">
      <ModuleGrid modules={modules} />
    </main>
  );
}

export default App;
