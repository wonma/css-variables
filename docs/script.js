

const inputs = document.querySelectorAll('.wrapper input')

function hexToRgbA(hex, version){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        if(version === 'full') {
        	return `rgba(` + [(c>>16)&255, (c>>8)&255, c&255].join(',') + `)`;
        } else if(version === 'num') {
           return [(c>>16)&255, (c>>8)&255, c&255].join(' ');
        }
    }
    throw new Error('Bad Hex');
}


function handleChange () {
	const otherStandard = this.name !== 'color' && keyState === 'on'
	const colorStandard = this.name === 'color'

	const suffix = this.dataset.sizing || ''
	if(otherStandard || colorStandard) {
		if (this.name === 'blur') {
			document.documentElement.style.setProperty('--blur', this.value + suffix)
		}

		if (this.name === 'speed') {
			document.documentElement.style.setProperty('--speed', this.value + suffix)	
		}

		if (this.name === 'color') {
			const toRGB = hexToRgbA(this.value, 'full')
			document.documentElement.style.setProperty('--color', toRGB)		
		}

		checkCompletion()
	}
}

let keyState = 'off'

inputs.forEach((input) => {
	// event control
	if (input.type === 'color') {
		input.addEventListener('change', handleChange)	
	} else {
		input.addEventListener('mousedown', () => {
			keyState = 'on'
		})
		input.addEventListener('mouseup', () => {
			keyState = 'off'
		})
		input.addEventListener('mousemove', handleChange)	
	}
})


function checkCompletion () {
	const blurNow = document.querySelector('#blur').value
	const speedNow = document.querySelector('#speed').value
	const colorNow = hexToRgbA(document.querySelector('#color').value, 'num')

	const splitRGB = colorNow.split(' ')
	const rgbCondition = splitRGB[0] > 230 && splitRGB[1] < 50 && splitRGB[2] < 30

	console.log(blurNow, speedNow, rgbCondition)

	if (blurNow === '0' && speedNow === '0.5' && rgbCondition === true) {
		
		console.log('ha')
		document.querySelector('.message').classList.remove('hide')
		// const message = document.createElement('p') 
		// message.textContent = 'I love you!'
		// message.classList.add('message')
		// document.querySelector('#wrapper').appendChild(message)
	} else {
		document.querySelector('.message').classList.add('hide')
	}


}
