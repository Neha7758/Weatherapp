// const weatherform=document.querySelector(".weatherform");
// const cityInput= document.querySelector(".cityInput")
// const card=document.querySelector(".card");
// const apikey="1099652cf061230a634c22a3ea9ad21f";
// weatherform.addEventListener("submit", async event=>{
//     event.preventDefault();
//     const city=cityInput.value;
//     if(city){
//         try{
// const weatherData= await getWeatherData(city);
// displayweatherInfo(weatherData);
//         }
//         catch(error)
//         {
//             console.error(error)
//             displayError(error)
//         }

//     }
//     else{
//         displayError("Please enter a  city")
//     }

// });
// async function getWeatherData(city) {
//     const apiUrl='https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}';
//     const response= await fetch(apiUrl);
//     console.log(response);
//     if (!response.ok)
//     {
//         throw new Error();
//     }
    

    
// }
// async function displayweatherInfo(data) {
    
// }
// function getWeatherEmoji(watherId){

// }
// function displayError(message){
//     const errorDisplay = document.createElement("p")
//     errorDisplay.textContent=message;
//     errorDisplay.classList.add("errorDisplay");
//     card.textContent="";
//     card.style.display="flex";
//     card.appendChild(errorDisplay)
// }
// 

const weatherform = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "1099652cf061230a634c22a3ea9ad21f";

weatherform.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
    const response = await fetch(proxyUrl);
    const data = await response.json();
    const weatherData = JSON.parse(data.contents); // Parse the contents field
    console.log(weatherData);
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText} (Status Code: ${response.status})`);
    }
    return weatherData;
}

 function displayWeatherInfo(data) {
    const {name:city, 
        main:{temp, humidity},
        weather:[{description,id}]}=data;
   
        card.textContent="";
        card.style.display="flex";

        const cityDisplay=document.createElement("h1");
        const tempDisplay=document.createElement("p");
        const humidityDisplay=document.createElement("p");
        const descDisplay=document.createElement("h1");
        const weatherEmoji=document.createElement("p");
        cityDisplay.textContent=city;
        tempDisplay.textContent=`${((temp - 273.15) *(9/5)+32).toFixed(1)}ºF`;
        humidityDisplay.textContent=`Humidity:${humidity}% `;
        descDisplay.textContent=description;
        weatherEmoji.textContent=getWeatherEmoji(id)
       
        cityDisplay.classList.add("cityDisplay");
        cityDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("tempDisplay");
        descDisplay.classList.add("descDisplay")
        weatherEmoji.classList.add("weatherEmoji")

        card.appendChild(cityDisplay );
        card.appendChild(tempDisplay);
        card.appendChild(descDisplay);
        card.appendChild(humidityDisplay)
        card.appendChild(weatherEmoji)
        
}

function getWeatherEmoji(weatherId) {
    switch(true)
    {
        case (weatherId >= 200 && weatherId<300):
        return"⛈";
        case (weatherId>= 300 && weatherId<400):
        return"❄";
        case (weatherId>= 500 && weatherId<600):
        return"⛈";
        case (weatherId>= 600 && weatherId<700):
        return"⛈";
        case (weatherId===800):
        return"🌞";
        case(weatherId>=801 && weatherId<=810):
               return"⛈";  
            default:
            return "?";
        
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
