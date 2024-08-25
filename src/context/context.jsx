import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) =>{
    
    const[input,setInput] = useState("");
    const[recentPrompt,setRecentPrompt]=useState("");
    const[prevPrompts,setPrevPrompts] = useState([]);
    const[showResult,setShowResult] = useState(false)
    const[loading,setLoading]=useState(false)
    const[resultData,setResultData]=useState("");


    const onSend = async(prompt) => {
        setResultData(""); // Pehle resultData ko clear karenge
        setLoading(true);  // Loading ko true set karenge
        setShowResult(true);  // Yahan pe showResult ko true karenge
        setRecentPrompt(input)
        const response = await run(input);  // API call karenge
        setResultData(response);  // Response ko set karenge
        setLoading(false);  // Loading ko false karenge
        setInput("");  // Input field ko clear karenge
    }
    

    

    const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSend,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider