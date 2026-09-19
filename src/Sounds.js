import { useEffect } from 'react';
import useSound from 'use-sound';

//Mp3 Sounds
import powerOn from './assets/SFX/poweron.mp3'
import powerOff from './assets/SFX/poweroff.mp3'
import computerSound from './assets/SFX/computerboot.mp3'
import empty from './assets/SFX/empty.mp3'
import keyA from './assets/SFX/keyA.mp3'
import keyB from './assets/SFX/keyB.mp3'
import keyC from './assets/SFX/keyC.mp3'
import startbru from './assets/SFX/startgamebru.mp3'

// terminalSfxEnabled: when false, sounds that belong to the terminal (power, boot, keys) go silent.
export function useAudioManager(terminalSfxEnabled = true) {
  const [playPowerOn] = useSound(powerOn, { volume: 0.8 })
  const [playPowerOff] = useSound(powerOff, { volume: 0.8 })
  const [computerBoot, bootControls] = useSound(computerSound, { volume: 0.8 })
  const [playEmpty] = useSound(empty, { volume: 0.2, loop: true, playbackRate: 1.5 })
  const [playKeyA] = useSound(keyA, { volume: 0.7 })
  const [playKeyB] = useSound(keyB, { volume: 0.7 })
  const [playKeyC] = useSound(keyC, { volume: 0.7 })
  const [startNoise] = useSound(startbru, { volume: 1 })

  //Wrap a terminal-only sound so it does nothing while terminal sounds are off
  const terminalOnly = (play) => (...args) => (terminalSfxEnabled ? play(...args) : undefined)

  //Cut a boot sound that is mid-play the moment terminal sounds turn off
  useEffect(() => {
    if (!terminalSfxEnabled && bootControls.sound) bootControls.stop()
  }, [terminalSfxEnabled, bootControls])

  //Return object with all da sounds
  //So basically all sound is controlled by same audio object preventing any bugs
  return {
    playPowerOn: terminalOnly(playPowerOn),
    playPowerOff: terminalOnly(playPowerOff),
    computerBoot: terminalOnly(computerBoot),
    bootControls,
    playEmpty,
    playKeyA: terminalOnly(playKeyA),
    playKeyB: terminalOnly(playKeyB),
    playKeyC: terminalOnly(playKeyC),
    startNoise
  }
}