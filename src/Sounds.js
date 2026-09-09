import useSound from 'use-sound';

//Mp3 Sounds
import powerOn from './assets/poweron.mp3'
import powerOff from './assets/poweroff.mp3'
import computerSound from './assets/computerboot.mp3'
import empty from './assets/empty.mp3'
import keyA from './assets/keyA.mp3'
import keyB from './assets/keyB.mp3'
import keyC from './assets/keyC.mp3'
import startbru from './assets/startgamebru.mp3'

export function useAudioManager() {
  const [playPowerOn] = useSound(powerOn, { volume: 0.8 })
  const [playPowerOff] = useSound(powerOff, { volume: 0.8 })
  const [computerBoot, bootControls] = useSound(computerSound, { volume: 0.8 })
  const [playEmpty] = useSound(empty, { volume: 0.3, loop: true, playbackRate: 1.5 })
  const [playKeyA] = useSound(keyA, { volume: 0.7 })
  const [playKeyB] = useSound(keyB, { volume: 0.7 })
  const [playKeyC] = useSound(keyC, { volume: 0.7 })
  const [startNoise] = useSound(startbru, { volume: 1 })

  //Return object with all da sounds
  return {
    playPowerOn,
    playPowerOff,
    computerBoot,
    bootControls,
    playEmpty,
    playKeyA,
    playKeyB,
    playKeyC,
    startNoise
  }
}