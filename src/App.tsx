import "./App.css";
import ModuleGrid from "./modules/4ModuleGrid.tsx";
import { modules } from "./modules/2struct_modules.tsx";

function App() {
  return (
    <main className="container">
      <div className="plateWorkSpace">
        <ModuleGrid modules={modules} />
      </div>
    </main>
  );
}

export default App;
