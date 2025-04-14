import React from "react";

interface ModuleTileProps {
  children: React.ReactNode;
}

const ModuleTile: React.FC<ModuleTileProps> = ({ children }) => {
  return (
    <div className="tile">
      {children}
    </div>
  );
};

export default ModuleTile;
