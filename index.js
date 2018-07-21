'use strict';

import './main.scss';
const key ='9zwDBklUOYTiqqsSxFuE233KvpOENTjliMW4kUVZ';
const id = 'yiPe0lZJCXRtvN7RRmcGb';

const getElementAndChangeText = (selector, string) =>{
    const element = document.querySelector(`.${selector}`);
    element.innerHTML = string;
}


const d = new Date();

let currentHour = d.getHours();
let minuteRightNow = d.getMinutes();


if(minuteRightNow<10){
    minuteRightNow = '0'+ minuteRightNow
}

const TimeRightNow = `${currentHour}:${minuteRightNow}`;

window.setInterval(()=>{ 
    const l = new Date();
    if (l.getUTCSeconds() === 0 ){
        currentHour = l.getHours();
        minuteRightNow  = l.getMinutes();
        if(minuteRightNow < 10){
            minuteRightNow  = '0'+ minuteRightNow 
        }
        const updatedTime = `${currentHour}:${minuteRightNow}`;
        getElementAndChangeText('current-time',updatedTime);
    }
 }, 1000);

const getGreeting = (timeVar) => {
    let greeting ='';
    if (timeVar < 12) {
        greeting = 'Good morning,'
    } else if (timeVar >= 12 && timeVar < 18) {
        greeting = 'Good afternoon,'
    } else {
        greeting = 'Good evening,'
    }
    getElementAndChangeText('greeting', greeting);
};

getGreeting(currentHour);
getElementAndChangeText('current-time',TimeRightNow);

 
const changeBodyClass = (timeVar) =>{
    const body = document.querySelector('body');
    if (timeVar > 4 && timeVar <= 8) {
        body.classList.add('early-morning');
    } else if (timeVar > 8 && timeVar <= 11) {
        body.classList.add('mid-morning');
    } else if (timeVar > 11 && timeVar <= 13 ) {
        body.classList.add('noon');
    } else if(timeVar>= 14 && timeVar <= 15){
        body.classList.add('early-afternoon')
    }else if(timeVar>= 16 && timeVar <= 18){
        body.classList.add('late-afternoon')
    } else if(timeVar> 18 && timeVar <= 19){
        body.classList.add('sunset');
    } else if(timeVar> 19 && timeVar <= 21 || timeVar> 2 && timeVar <= 4 ){
        body.classList.add('early-evening');
    }else if(timeVar> 21 && timeVar <= 23){
        body.classList.add('night');
    }else if(timeVar> 23 && timeVar <= 2){
        body.classList.add('midnight');
    }
}

changeBodyClass(currentHour);


fetch(`http://api.aerisapi.com/observations/toronto,on?client_id=${id}&client_secret=${key}`,
{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
}).then((response)=>{
    if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then((data) => {
        const temp = data.response.ob.feelslikeC + '°C';
        const weatherDesc = data.response.ob.weather;
        getElementAndChangeText('temperature', temp);
        // getElementAndChangeText('weather-description', weatherDesc)

      })

})
