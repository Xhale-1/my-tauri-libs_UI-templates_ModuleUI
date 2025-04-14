import React from "react";
import ModuleTile from "./3ModuleTile";

interface Props {
  modules: { id: string; preview: React.ReactNode }[];
}

const ModuleGrid: React.FC<Props> = ({ modules }) => {
  return (
    <div className="grid">
      {modules.map((mod) => (
        <ModuleTile key={mod.id}>{mod.preview}</ModuleTile>
      ))}
    </div>
  );
};

export default ModuleGrid;
