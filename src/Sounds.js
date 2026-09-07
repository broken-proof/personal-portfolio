import useSound from 'use-sound';

//Mp3 Sounds
import powerOn from './assets/poweron.mp3'
import powerOff from './assets/poweroff.mp3'
import computerSound from './assets/computerboot.mp3'
import empty from './assets/empty.mp3'

export function useAudioManager() {
  const [playPowerOn] = useSound(powerOn, { volume: 0.8 })
  const [playPowerOff] = useSound(powerOff, { volume: 0.8 })
  const [computerBoot, bootControls] = useSound(computerSound, { volume: 0.8 })
  const [playEmpty] = useSound(empty, { volume: 0.8, loop: true, playbackRate: 1.5 })

  //Return object with all the sounds
  return { playPowerOn, playPowerOff, computerBoot, bootControls, playEmpty }
}