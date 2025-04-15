import "./App.css";
import ModuleGrid from "./modules_handle/4ModuleGrid.tsx";
import { modules } from "./modules_handle/2struct_modules.tsx";

function App() {
  return (
    <main className="container">
      <div className="backingPlate">
        <ModuleGrid modules={modules} />
      </div>
    </main>
  );
}

export default App;
