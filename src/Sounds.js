import { useEffect, useRef } from 'react';
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
import click from './assets/SFX/click.mp3'

// terminalSfxEnabled: when false, sounds that belong to the terminal (power, boot, keys) go silent.
export function useAudioManager(terminalSfxEnabled = true) {
  const [playPowerOn] = useSound(powerOn, { volume: 0.8 })
  const [playPowerOff] = useSound(powerOff, { volume: 0.8 })
  const [computerBoot, bootControls] = useSound(computerSound, { volume: 0.1, playbackRate: 1.25 })
  const [playEmpty, emptyControls] = useSound(empty, { volume: 0.35, loop: true, playbackRate: 1 })
  const [playKeyA] = useSound(keyA, { volume: 0.7 })
  const [playKeyB] = useSound(keyB, { volume: 0.7 })
  const [playKeyC] = useSound(keyC, { volume: 0.7 })
  const [startNoise] = useSound(startbru, { volume: 0.7, playbackRate: 1 })
  const [playClick] = useSound(click, { volume: 0.3 })

  //Wrap a terminal-only sound so it does nothing while terminal sounds are off
  const terminalOnly = (play) => (...args) => (terminalSfxEnabled ? play(...args) : undefined)

  //Start the background loop exactly once, as soon as its file has loaded. Calling play again (e.g. on every
  //re-render or view switch) would start another copy from the beginning. Howler waits for the first user
  //interaction if the browser blocks autoplay.
  const emptyStarted = useRef(false)
  useEffect(() => {
    if (emptyControls.sound && !emptyStarted.current) {
      emptyStarted.current = true
      playEmpty()
    }
  }, [emptyControls.sound, playEmpty])

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
    playKeyA: terminalOnly(playKeyA),
    playKeyB: terminalOnly(playKeyB),
    playKeyC: terminalOnly(playKeyC),
    startNoise,
    playClick
  }
}