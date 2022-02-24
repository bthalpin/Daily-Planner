const dateEl = $('#currentDay');
const mainEl = $('.planner');


// Initial time on page load
dateEl.text(moment().format('MMMM Do YYYY, h:mm:ss a'))

const hours = ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM']
const twentyFourHous = [9,10,11,12,13,14,15,16,17]
let plannerContent = {'9AM':'',
                        '10AM':'',
                        '11AM':'',
                        '12PM':'',
                        '1PM':'',
                        '2PM':'',
                        '3PM':'',
                        '4PM':'',
                        '5PM':''
                    }




function loadPlannerData() {
    const rawData = localStorage.getItem('plannerContent')
    const loadedData = JSON.parse(rawData)
    if (loadedData){
        plannerContent = loadedData
    }
}

function savePlanner() {
    const plannerNote = $(this).prev()[0].value;
    const plannerTime = $(this).prev().prev()[0].textContent;
    plannerContent[plannerTime] = plannerNote;
    localStorage.setItem('plannerContent',JSON.stringify(plannerContent))
}

function createPlanner() {
    $.each(twentyFourHous,function(index,val){

        // Creates main row to append the planner information for each hour
        let plannerRow = $('<div>')
        plannerRow.addClass('row m-1')

        // Creates information for the planner
        let hour = $('<div>').text(hours[index])
        let notes = $('<textarea>')
        let button = $('<button>')

        let icon = $('<i>')
        icon.html('&#128190')
        button.append(icon)

        // Displays the text from the plannerContent object if any is there
        notes.text(plannerContent[hours[index]])

        hour.addClass('col-2 col-md-1 d-flex justify-content-center align-items-center border border-dark border-left-0')
        notes.addClass('col-8 col-md-10 notes')
        button.addClass('col-2 col-md-1 saveBtn')
        
        // Changes the colors for the hour blocks depending on if it is present, past, or future
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

        plannerRow.append(hour,notes,button)
        mainEl.append(plannerRow)
    })
    
}

function updateTime() {

     // Updates time every second
    let refreshTimer = setInterval(function(){
        dateEl.text(moment().format('MMMM Do YYYY h:mm:ss a'))
    },1000)
}


function init() {
    mainEl.on('click','.saveBtn',savePlanner)
    loadPlannerData()
    createPlanner()
    updateTime()
}

init()