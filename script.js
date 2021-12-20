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