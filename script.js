const date = new Date();
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const todoArea = document.querySelector(".todo-area");

function openModal(uniqueID, e) {
    // console.log(e.parentElement.parentElement.querySelector("h1").innerText);
    console.log(e);
    todoArea.style.display = "block";
    let cbtn=document.querySelector("#cancel");
    let sbtn=document.querySelector('#save');
    
    sbtn.addEventListener('click',()=>{
        alert("Event Created Successfully!")
        todoArea.style.display="none"
        e.innerHTML+=`<div class=dot></div>`
        console.log(document.querySelector(".dot"))
        e.addEventListener("dblclick",(e)=>{
            e.querySelector(".dot").style.display = "none"
            document.getElementById("TitleInput").value=''
            document.getElementById("description").value=''
          })
    })
    cbtn.addEventListener('click',()=>{
        // document.querySelector(`.m-${uniqueID} #TitleInput`).value=''
        // document.querySelector(`.m-${uniqueID} #description`).value=''
        document.getElementById("TitleInput").value=''
        document.getElementById("description").value=''
        todoArea.style.display="none"
    })
    // console.log(btn);
    // let x=document.querySelector();   
    // // todoArea
    // console.log(x);
    
}


const renderCalendar = () => {
    date.setDate(1);

    const monthDays = document.querySelector(".days");

    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    const prevLastDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    document.querySelector(".date h1").innerHTML = months[date.getMonth()];
    document.querySelector(".date h2").innerHTML = date.getFullYear();
    // console.log();

    document.querySelector(".date p").innerHTML = new Date().toDateString();

    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        let uniqueID = uuid.v1().substring(0, 5);
        if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
        ) {
            todoArea.innerHTML += `<div class="modal m-${uniqueID}">
            <h2>New Event</h2>

            <input id="TitleInput" placeholder="Event Title" size="36rem" />
            <textarea id="description" rows="4" cols="35" placeholder="Event Description"></textarea>
            <button id="save">Save</button>
            <button id="cancel">Cancel</button>
            </div>`;
            days += `<div class="today" onclick="openModal("${uniqueID}",this)">${i}</div>`;
        } else {
            todoArea.innerHTML += `<div class="modal m-${uniqueID}"></div>`;
            days += `<div onclick="openModal('${uniqueID}',this)">${i}</div>`;
        }


    }
    // document.querySelector(".days div").addEventListener("click",()=>openModal(`${date.getMonth()+1}/${i}/${date.getFullYear()}`));

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
    }

    monthDays.innerHTML = days;
};


document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

renderCalendar();
const weatherApi = {
    key: "bab281d79e5f1e9755a68d754cc313e7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    
    if(event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }

});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// Show Weather Report

let back = document.querySelector('.app-main');
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    // date.innerText = dateManage(todayDate);

    
    if(weatherType.innerText == "Clear") {
        back.style.backgroundImage = "url('https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/green-field-over-blue-clear-sky-da-kuk.jpg')";

        
    } else if(weatherType.innerText == 'Clouds') {

        back.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Lenticular_Cloud_over_Harold%27s_Cross_Dublin_Ireland_30-6-15.jpg/1200px-Lenticular_Cloud_over_Harold%27s_Cross_Dublin_Ireland_30-6-15.jpg')";
        
    } else if(weatherType.innerText == 'Haze') {

        back.style.backgroundImage = "url('https://images.firstpost.com/wp-content/uploads/2021/03/AP21074098816923-1.jpg')";
        
    }     else if(weatherType.innerText == 'Rain') {
        
        back.style.backgroundImage = "url('https://i.pinimg.com/originals/38/b0/4c/38b04ccb0dbdb3bb822f0e607d4da8da.jpg')";
        
    } else if(weatherType.innerText == 'Snow') {
        
        back.style.backgroundImage = "url('https://images.unsplash.com/photo-1516431883659-655d41c09bf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c25vd2luZ3xlbnwwfHwwfHw%3D&w=1000&q=80')";
    
    } else if(weatherType.innerText == 'Smoke') {
        
        back.style.backgroundImage = "url('https://i.pinimg.com/originals/40/a0/2b/40a02b5b60865dbf2ae127406bac583b.jpg')";
    
    }else if(weatherType.innerText == 'Thunderstorm') {
    
        back.style.backgroundImage = "url('https://images.newscientist.com/wp-content/uploads/2019/03/20115708/gettyimages-673747736.jpg')";
        
     } //else{
    //     back.style.backgroundImage ="url('https://c.files.bbci.co.uk/180C5/production/_117610589_raincloud.jpg ')"
    // }
}

// Date manage
// function dateManage(dateArg) {

//     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//     let year = dateArg.getFullYear();
//     let month = months[dateArg.getMonth()];
//     let date = dateArg.getDate();
//     let day = days[dateArg.getDay()];

//     return `${date} ${month} (${day}), ${year}`;
// }