import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

const Query = () => {
    const [dev, setdev] = useState<string | null>("1");
    const [sym, setsym] = useState<string | null>("2");

    async function make_query(){

        const query1 = "SELECT COUNT(*) FROM E3_ADMIN.\"ComponentData\" ";
        const query2 = "SELECT COUNT(*) FROM E3_ADMIN.\"SymbolData\" ";
        const response: string = await invoke("dsaemdbquery", { query: query1 });
        const response2: string = await invoke("dsaemdbquery", {query: query2});
        setdev(response);
        setsym(response2);
    }

    function clear_response() {
        setdev(null);
        setsym(null);
    }


    return (
        <div>
            <button onClick={make_query}> make query </button>
            <button onClick = {clear_response}> clear response</button>
            <p>dev: {dev}</p>
            <p>sym: {sym}</p>
        </div>
    )

};

export default Query;