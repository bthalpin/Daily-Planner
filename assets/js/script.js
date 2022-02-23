const dateEl = $('#currentDay');
const mainEl = $('.calendar');


// Initial time on page load
dateEl.text(moment().format('MMMM Do YYYY, h:mm:ss a'))

const hours = ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM']
const twentyFourHous = [9,10,11,12,13,14,15,16,17]
let calendarContent = {'9AM':'',
                        '10AM':'',
                        '11AM':'',
                        '12PM':'',
                        '1PM':'',
                        '2PM':'',
                        '3PM':'',
                        '4PM':'',
                        '5PM':''
                    }




function loadCalendarData() {
    const rawData = localStorage.getItem('calendarContent')
    const loadedData = JSON.parse(rawData)
    if (loadedData){
        calendarContent = loadedData
    }
    console.log(calendarContent)
}

function saveCalendar() {
    const calendarNote = $(this).prev()[0].value;
    const calendarTime = $(this).prev().prev()[0].textContent;
    calendarContent[calendarTime] = calendarNote;
    localStorage.setItem('calendarContent',JSON.stringify(calendarContent))
}

function createCalendar() {
    $.each(twentyFourHous,function(index,val){

        // 
        let calendarRow = $('<div>')
        calendarRow.addClass('row m-1')

        // 
        let hour = $('<div>').text(hours[index])
        let notes = $('<textarea>')
        let button = $('<button>')

        let icon = $('<i>')
        icon.html('&#128190')
        button.append(icon)

        // 
        notes.text(calendarContent[hours[index]])

        hour.addClass('col-2 col-md-1 d-flex justify-content-center align-items-center border border-dark border-left-0')
        notes.addClass('col-8 col-md-10 notes')
        button.addClass('col-2 col-md-1 saveBtn')
        
        // 
        let currentHour = moment().hour()
        if (currentHour === val){
            notes.addClass('present')
        }
        else if (currentHour < val ){
            notes.addClass('future')
        }
        else {
            notes.addClass('past')
        }

        calendarRow.append(hour,notes,button)
        mainEl.append(calendarRow)
    })
    
}

function updateTime() {

     // Updates time every second
    let refreshTimer = setInterval(function(){
        dateEl.text(moment().format('MMMM Do YYYY h:mm:ss a'))
    },1000)
}


function init() {
    mainEl.on('click','.saveBtn',saveCalendar)
    loadCalendarData()
    createCalendar()
    updateTime()
}

init()