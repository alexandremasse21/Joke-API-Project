import ejs from "ejs";
import express from "express";
import axios from "axios";

const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("index.ejs");
  });
  
app.get('/get-joke', async (req, res) => {
    const { type, blacklistFlags } = req.query;
    let url = `https://v2.jokeapi.dev/joke/${type}`;
    
    if (blacklistFlags) {
      url += `?blacklistFlags=${blacklistFlags}`;
    }
  
    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error fetching joke');
    }
  });

  

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });