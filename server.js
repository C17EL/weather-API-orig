import axios from "axios";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

const yourAPIKey = "271ae8090c9641f36db201dd19467351"

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("index", {  city: null, des:null, icon:null, temp:null });

      
});


    
    app.post("/", async (req, res) => {
 
        const city = req.body.city;
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${yourAPIKey}`;
        try {
        const result = await axios.get(API_URL);
        const data = result.data;
        res.get("index.ejs", { content: JSON.stringify(result.data) });
        if (data.cod === "404") {
            return res.render("index", {
                city: "City not found",
                des: null,
                icon: null,
                temp: null,
            
            });
        } else {
            const cityName = data.name;
            const des = data.weather[0].description;
            const icon = data.weather[0].icon;
            const temp = data.main?.temp;

           return res.render("index", {
                city: cityName,
                des,
                icon: icon || null,
                temp: temp !== undefined ? temp: null,
            });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
       return res.render("index", {
            city: "Something went wrong",
            des: null,
            icon: null,
            temp: null,
        });
         }
    });
        








  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  