const secHand = document.querySelector('.sec-hand')
const minHand = document.querySelector('.min-hand')
const hourHand = document.querySelector('.hour-hand')

const secHandKO = document.querySelector('.sec-hand-ko')
const minHandKO = document.querySelector('.min-hand-ko')
const hourHandKO = document.querySelector('.hour-hand-ko')


function changeBG(hour, timezone) {
	let bgColor ='#333'
	let targetClock =''


	if(hour >= 4 && hour < 6) {
		bgColor = 'purple'
	} else if(hour >= 6 && hour < 16) {
		bgColor = 'yellow'
	} else if(hour >= 16 && hour < 18) {
		bgColor = 'orange'
	} else if(hour >= 18 && hour < 20) {
		bgColor = 'darkgrey'
	} else if(hour >= 20 && hour < 4) {
		bgColor = 'black'
	}

	if(timezone ==='utc') {
		targetClock = document.querySelector('.clock-body-utc')
	} else {
		targetClock = document.querySelector('.clock-body-ko')
	}
 
	targetClock.style.backgroundColor = bgColor
}


function renderHands(angles, timezone) {

	const {sec, min, hour} = angles

	if (timezone === 'utc') {
		secHand.style.transform = `rotate(${sec}deg)`
		minHand.style.transform = `rotate(${min}deg)`
		hourHand.style.transform = `rotate(${hour}deg)`		
	} else if (timezone === 'ko') {
		secHandKO.style.transform = `rotate(${sec}deg)`
		minHandKO.style.transform = `rotate(${min}deg)`
		hourHandKO.style.transform = `rotate(${hour}deg)`	
	}

}

function calTimeAngle(sec, min, hour, timezone) {

	let am = true

	if(hour >= 0 && hour < 13) {
		const am = true
	} else if(hour >= 13) {
		const am = false
		hour = hour - 12
	}

	const secAngle = (360 / 60) * sec - 90
	const minAngle = (360 / 60) * min - 90
	const hourAngle = (360 / 12) * hour - 90

	const angles = {
		sec: secAngle,
		min: minAngle,
		hour: hourAngle
	}

	renderHands(angles, timezone)
}

function checkTime() {

	const now = new Date()
	const seconds = now.getUTCSeconds()
	const minutes = now.getUTCMinutes()
	let hours = now.getUTCHours()

	const secondsKO = now.getSeconds()
	const minutesKO = now.getMinutes()
	let hoursKO = now.getHours()

	calTimeAngle(seconds, minutes, hours, 'utc')
	calTimeAngle(secondsKO, minutesKO, hoursKO, 'ko')
	changeBG(hours, 'utc')
	changeBG(hoursKO, 'ko')
}

setInterval(checkTime, 1000)