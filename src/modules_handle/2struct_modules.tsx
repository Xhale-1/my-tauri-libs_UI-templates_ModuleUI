

import { ReactNode } from "react";
import { FiCamera, FiCpu, FiDatabase } from "react-icons/fi";
import Query_preview from "../../src_modules/src/module1/module-query_preveiw.tsx";
import Query_workspace from "../../src_modules/src/module1/module-query_workspace.tsx";

interface ModuleInfo {
  id: string;
  preview: ReactNode;
  workspace: ReactNode;
}

export const modules: ModuleInfo[] = [
  {
    id: "camera",
    preview: (
      <div>
        <FiCamera size={40} />
        <p>Камера: подключена</p>
      </div>
    ),
    workspace: (
      <div>
        <FiCamera size={70} />
      </div>
    ),
  },
  {
    id: "processor",
    preview: (
      <div>
        <FiCpu size={40} />
        <p>Загрузка CPU: 25%</p>
      </div>
    ),
    workspace: 0,
  },
  {
    id: "database",
    preview: (
      <div>
        <FiDatabase size={40} />
        <p>БД: 3 активных подключения</p>
        <button>Обновить</button>
      </div>
    ),
    workspace:0,
  },
  {
    id: "query",
    preview: <Query_preview/>,
    workspace: <Query_workspace/>,
  }
];
