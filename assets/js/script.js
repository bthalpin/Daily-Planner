const dateEl = $('#currentDay');
const mainEl = $('.calendar');
let calendarContent = {'9AM':'',
                        '10AM':'',
                        '11AM':'',
                        '12PM':'',
                        '1PM':'',
                        '2PM':'',
                        '3PM':'',
                        '4PM':'',
                        '5PM':''}

const hours = ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM']
const twentyFourHous = [9,10,11,12,13,14,15,16,17]
console.log('test')
// Initial time on page load
dateEl.text(moment().format('MMMM Do YYYY, h:mm:ss a'))

console.log('timecheck',moment().hour())

// mainEl.on('click','.notes',function(){
    
//     let currentNote = $(this)
//     console.log('clicked')
//     $(window).on('keydown',function(event){
//         $(this).text($(event))
//         currentNote.text(currentNote.text()+event.originalEvent.key)
//         console.log('work',event,$(this),event.originalEvent.key)
//     })
//     })
    // let inputEl = $('<input>')
    // $(this).append(inputEl)
    // $(this).on('input',function(event){
    //     console.log($(event))
    //     let inputEl = $('<input>')
    //     $(this).append(inputEl)
    // })
// })
function loadCalendar() {
    const rawData = localStorage.getItem('calendarContent')
    const loadedData = JSON.parse(rawData)
    if (loadedData){
        calendarContent = loadedData
    }
    console.log(calendarContent)
}

function saveCalendar() {
    localStorage.setItem('calendarContent',JSON.stringify(calendarContent))
}

mainEl.on('click','.button',function(){
    console.log('button',$(this).prev()[0].value,$(this).prev().prev()[0].textContent)
    calendarContent[$(this).prev().prev()[0].textContent] = $(this).prev()[0].value
    saveCalendar()
})
function init() {
    loadCalendar()
    $.each(twentyFourHous,function(index,val){
        let mainList = $('<div>')
        mainList.addClass('row')
        let hour = $('<div>').text(hours[index])
        let notes = $('<textarea>')
        let button = $('<button>')
        let icon = $('<i>')
        icon.html('&#128190')
        console.log(calendarContent[hours[index]])
        notes.text(calendarContent[hours[index]])
        hour.addClass('col-2 col-md-1 d-flex justify-content-center align-items-center border border-dark border-left-0')
        notes.addClass('col-8 col-md-10 notes')
        button.addClass('col-2 col-md-1 button')
        button.addClass('saveBtn')
    
        button.append(icon)
        // 128190	1F4BE
        // console.log(currentHourConverted)
        // let hour = $('<li>').text(currentHourConverted)
        // let notes = $('<li>')
        // let button =$('<li>')
        // let listEl = $('<ul>')
        // notes.addClass('list-group-item  col-10 notes')
        let currentHour = moment().hour()
        if (currentHour === val){
            // notes.addClass('list-group-item-danger')
            notes.addClass('present')
        }
        else if (currentHour < val ){
            // notes.addClass('list-group-item-success')
            notes.addClass('future')
        }
        else {
            // notes.addClass('list-group-item-secondary')
            notes.addClass('past')
        }
        // hour.addClass('list-group-item col-1')
        // button.addClass('list-group-item list-group-item-primary col-1 button')
        // listEl.addClass('list-group list-group-horizontal mt-4')
       
        mainList.append(hour,notes,button)
        mainList.addClass('m-1')
        mainEl.append(mainList)
    })
    
    // Updates time every second
    let refreshTimer = setInterval(function(){
        dateEl.text(moment().format('MMMM Do YYYY h:mm:ss a'))
    },1000)
}

init()