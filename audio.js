const AUDIO_DB = [
{
    key: 'gameover',
    path: 'assets/sound/music/gameover.mp3'
},
{
    key: 'goomba-kill',
    path: 'assets/sound/effects/goomba-stomp.wav'
},
{
    key: 'coin-collect',
    path: 'assets/sound/effects/coin.mp3'
}
]

export const inGameAudio = ({ load }) => {
    AUDIO_DB.forEach(({key, path}) => {
        load.audio(key, path)
    })

}

export const playAudio = (id, { sound }, {volume = 1} = {}) => {
    try {
        return sound.add(id, {volume }).play()
    } catch (e) {
        console.error(e)
    }
} 