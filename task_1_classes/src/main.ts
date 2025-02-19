import './style.scss'

const root = document.querySelector('#app')

interface IWeather {
    type: string;
    color: string;
}

const WEATHER_DATA: IWeather[] = [
    {
        type: 'summer',
        color: '#dca21a'
    },
    {
        type: 'rain',
        color: '#a1408d'
    },
    {
        type: 'winter',
        color: '#2c3844'
    }
]

const container: HTMLDivElement = document.createElement('div')
container.className = 'container'
root!.append(container)

const inputContainer: HTMLDivElement = document.createElement('div')
inputContainer.className = 'input-container'
root!.append(inputContainer)

const rangeInput: HTMLInputElement = document.createElement('input')
rangeInput.setAttribute('type', 'range');
rangeInput.setAttribute('min', '0');
rangeInput.setAttribute('max', '1');
rangeInput.setAttribute('step', '0.1');
inputContainer.append(rangeInput)

for (let weatherElem of WEATHER_DATA) {
    renderWeatherBlock(weatherElem)
}

const audioElement: HTMLAudioElement = new Audio('assets/sounds/summer.mp3');
audioElement.loop = true
rangeInput.addEventListener('input', event => {
    audioElement.volume = +(event.target as HTMLInputElement).value;
});
function renderWeatherBlock(weatherElem: IWeather): void {
    const div: HTMLDivElement = document.createElement('div')
    const btn: HTMLButtonElement = document.createElement('button')

    div.className = weatherElem.type
    btn.id = `btn-${weatherElem.type}`

    div.append(btn)
    container.append(div)
}
container.addEventListener('click', e => {
    const buttonElem = (e.target as HTMLDivElement).closest('button')

    if (buttonElem !== null) {
        const weatherElem = WEATHER_DATA.find(elem => elem.type === buttonElem.id.split('-')[1])
        if (weatherElem) handleClickBtn(weatherElem, audioElement)
        e.stopPropagation()
    }
})

function handleClickBtn(weatherElem: IWeather, audioElement: HTMLAudioElement) {
    const { type, color } = weatherElem
    document.body.style.backgroundImage = `url(assets/${type}-bg.jpg)`
    document.querySelector('h1')!.style.color = color

    if (!audioElement.src.includes(`assets/sounds/${type}.mp3`)) {
        audioElement.src = `assets/sounds/${type}.mp3`
    }

    if (audioElement.paused) {
        audioElement.play();
        (document.querySelector(`#btn-${type}`) as HTMLButtonElement).style.backgroundImage = `url(assets/icons/${type}.svg)`
    } else {
        audioElement.pause();
        (document.querySelector(`#btn-${type}`) as HTMLButtonElement).style.backgroundImage = 'url(assets/icons/pause.svg)'
    }
}

