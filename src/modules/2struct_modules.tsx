

import { ReactNode } from "react";
import { FiCamera, FiCpu, FiDatabase } from "react-icons/fi";
import Query from "./1modules_itself/1module/module1_query.tsx";

interface ModuleInfo {
  id: string;
  preview: ReactNode;
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
  },
  {
    id: "processor",
    preview: (
      <div>
        <FiCpu size={40} />
        <p>Загрузка CPU: 25%</p>
      </div>
    ),
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
  },
  {
    id: "query",
    preview: <Query/>,
  }
];
