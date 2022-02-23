const dateEl = $('#currentDay');
const mainEl = $('.calendar');
const mainList = $('<ul>');
mainEl.append(mainList);

const hours = [9,10,11,12,1,2,3,4,5]
console.log('test')
// Initial time on page load
dateEl.text(moment().format('MMMM Do YYYY, h:mm:ss a'))

console.log(dateEl.text())
$.each(hours,function(index,val){
    let hour = $('<li>').text(val)
    mainList.append(hour)
})

function init() {

    // Updates time every second
    let refreshTimer = setInterval(function(){
        dateEl.text(moment().format('MMMM Do YYYY h:mm:ss a'))
    },1000)
}

init()