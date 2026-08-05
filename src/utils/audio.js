import closeAudio from '../assets/audio/tab_close.wav';
import openAudio from '../assets/audio/tab_open.wav';
import clickBoxAudio from '../assets/audio/click-box.mp3';
import buttonClickAudio from '../assets/audio/click-btn.mp3';
import muteOnAudio from '../assets/audio/ON-audio.mp3';
import muteOffAudio from '../assets/audio/OFF-audio.mp3';
import telephoneRingAudio from '../assets/audio/tel-ring.mp3';
import linkClickAudio from '../assets/audio/click.wav';

const SOUND_LIBRARY = {
  windowClose: { src: closeAudio },
  windowOpen: { src: openAudio },
  boxClick: { src: clickBoxAudio, volume: 0.5 },
  buttonClick: { src: buttonClickAudio },
  muteOn: { src: muteOnAudio },
  muteOff: { src: muteOffAudio },
  telephoneRing: { src: telephoneRingAudio, volume: 0.3 },
  linkClick: { src: linkClickAudio },
};

const isMuted = () => localStorage.getItem('isGlobalMuted') === 'true';

export const getGlobalMuteState = () => isMuted();

export const setGlobalMuteState = (nextMuted) => {
  localStorage.setItem('isGlobalMuted', String(nextMuted));
  return nextMuted;
};

export const createSound = (soundName, options = {}) => {
  const config = SOUND_LIBRARY[soundName];

  if (!config) {
    console.warn(`Unknown sound name: ${soundName}`);
    return null;
  }

  if (!options.ignoreMute && isMuted()) {
    return null;
  }

  const audio = new Audio(config.src);
  audio.volume = options.volume ?? config.volume ?? 1;

  if (options.loop !== undefined) {
    audio.loop = options.loop;
  }

  if (options.muted !== undefined) {
    audio.muted = options.muted;
  }

  if (options.playbackRate !== undefined) {
    audio.playbackRate = options.playbackRate;
  }

  return audio;
};

export const playSound = (soundName, options = {}) => {
  const audio = createSound(soundName, options);

  if (!audio) {
    return null;
  }

  audio.play().catch(() => undefined);
  return audio;
};
