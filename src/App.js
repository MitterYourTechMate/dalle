import logo from './logo.svg';
import './App.css';
import { TextField, CircularProgress, Button } from '@mui/material';
import { useState } from 'react';
import OpenAI from "openai";


function App() {
  const openai = new OpenAI({apiKey:"my api key", dangerouslyAllowBrowser:true});

  const [prompt, setPrompt] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    // alert(prompt)
    setLoading(true)
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    let image_url = response.data[0].url;
    setUrl(image_url)
    setLoading(false)
  }
  return (
    <div className="App" style={{marginTop:"10%", display:"flex", flexDirection:"column", alignItems:"center", gap:"5px"}}>
      <TextField label="Imagine" style={{width:"300px"}} onChange={(event) => setPrompt(event.target.value)}></TextField>
      <Button variant="contained" style={{backgroundColor:"black"}} onClick={handleClick}>GENERATE IMAGE</Button>
      {!loading && url !== "" &&
       <img src={url} style={{height:"500px", width:"500px"}}></img>
      }
      {loading &&
        <CircularProgress></CircularProgress>
      }
      
      
    </div>
  );
}

export default App;
