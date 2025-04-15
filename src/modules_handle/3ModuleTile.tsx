import React from "react";
import { useState } from "react";



interface ModuleTileProps {
  preview: React.ReactNode;
  workspace: React.ReactNode;
}


const ModuleTile: React.FC<ModuleTileProps> = ({preview, workspace}) => {


  const [isWorkspaceVisible, setIsWorkspaceVisible] = useState(false);

  const handleClick = () => {
      setIsWorkspaceVisible((prev) => !prev);
    };
  const close = () => {
    setIsWorkspaceVisible(false)
  }



  return (
    <div>


      <div className="tile" onClick={handleClick}>
        {preview}
        <p>{isWorkspaceVisible.toString()} </p>
      </div>


      {isWorkspaceVisible && (
        <>
          {/* Затемнение фона */}
          <div className="overlay"></div>

          {/* Панель workspace */}
          <div className="workspace">
            {workspace}
            <button onClick = {close}>close</button>
          </div>
        </>
      )}


    </div>
  );
};

export default ModuleTile;
