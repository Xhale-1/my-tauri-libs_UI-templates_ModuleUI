import { useState, useEffect } from "react"
import { listen, UnlistenFn } from '@tauri-apps/api/event';


const Query_workspace = () => {

    const [devcount, setDevcount] = useState<string>()
    const [symcount, setSymcount] = useState<string>()

    
    const listen_backend = <T,>(
        eventName: string,
        callback: (payload: T) => void,
        dependencies: any[] = []
      ) => {
        useEffect(() => {
          let unlisten: UnlistenFn | undefined;
    
          listen<T>(eventName, (event) => {
            callback(event.payload);
          }).then((unlistenFn) => {
            unlisten = unlistenFn;
          });
          return () => {
            unlisten?.();
          };
        }, dependencies);
      };
    
    listen_backend<number>('dev', (payload) => {
        setDevcount(payload.toString());
      });
    listen_backend<number>('sym', (payload) => {
        setSymcount(payload.toString());
      });


    return (
    <div>
        <p> devcount: {devcount}</p>
        <p> symcount: {symcount}</p>
    </div>
    )

}

export default Query_workspace