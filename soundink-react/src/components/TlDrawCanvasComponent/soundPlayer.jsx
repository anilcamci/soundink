// import { mapNoteToSampleNumber, mapColorToInstrumentFolder } from './soundMappings'; // Import both mappings

// // Initialize the Web Audio context globally
// let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// // Cache for audio buffers to avoid reloading sounds repeatedly
// const bufferCache = {};

// // Store references to active audio sources
// let activeSources = [];

// // Function to load an audio buffer for a specific sample
// const loadAudioBuffer = async (filePath) => {
//   if (bufferCache[filePath]) {
//     return bufferCache[filePath]; // Return cached buffer if it exists
//   }

//   const response = await fetch(filePath);
//   const arrayBuffer = await response.arrayBuffer();
//   const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

//   bufferCache[filePath] = audioBuffer; // Cache the loaded buffer
//   return audioBuffer;
// };

// // Define ADSR, detuning, base volume, and sustain settings for each instrument
// const instrumentSettings = {
//   bass: { attack: 0, decay: 0.3, sustain: 0.8, release: 0.5, detuneMin: -0.005, detuneMax: 0.005, baseVolume: 0.4, sustainMultiplier: 150 },
//   epiano: { attack: 0.01, decay: 0.2, sustain: 0.7, release: 0.4, detuneMin: -0.001, detuneMax: 0.001, baseVolume: 0.4, sustainMultiplier: 200 },
//   floom: { attack: 0, decay: 0.2, sustain: 0.9, release: 0.3, detuneMin: -0.002, detuneMax: 0.002, baseVolume: 0.4, sustainMultiplier: 180 },
//   guitar: { attack: 0, decay: 0.3, sustain: 0.7, release: 0.5, detuneMin: -0.005, detuneMax: 0.005, baseVolume: 0.2, sustainMultiplier: 300 },
//   marimba: { attack: 0, decay: 0.1, sustain: 0.7, release: 0.3, detuneMin: -0.002, detuneMax: 0.002, baseVolume: 0.4, sustainMultiplier: 300 },
//   pianohigh: { attack: 0, decay: 0.3, sustain: 0.6, release: 0.4, detuneMin: -0.0001, detuneMax: 0.0001, baseVolume: 0.4, sustainMultiplier: 250 },
//   pianolow: { attack: 0, decay: 0.4, sustain: 0.6, release: 0.5, detuneMin: -0.0001, detuneMax: 0.0001, baseVolume: 0.3, sustainMultiplier: 200 },
//   strings: { attack: 0, decay: 0.5, sustain: 0.4, release: 0.7, detuneMin: -0.005, detuneMax: 0.005, baseVolume: 0.2, sustainMultiplier: 20 },
//   synthflute: { attack: 0, decay: 0.25, sustain: 0.7, release: 0.4, detuneMin: -0.003, detuneMax: 0.003, baseVolume: 0.3, sustainMultiplier: 160 }
// };

// // Function to generate slight random variations
// const getRandomVariation = (min, max) => Math.random() * (max - min) + min;

// export const playSound = async (color, note, polyphonyCount = 1, playbackSpeed, lineId, colorInstrumentMap) => {
//   // console.log(`Playing sound for line: ${lineId}`);

//   const instrumentFolder = colorInstrumentMap[color] || 'defaultInstrument';

//   if (!color || color === 0) {
//     console.error('Invalid color passed:', color);
//     return;
//   }

//   const sampleNumber = mapNoteToSampleNumber[note];
//   if (!sampleNumber) {
//     console.error(`No sample number found for note: ${note}`);
//     return;
//   }

//   // const instrumentFolder = mapColorToInstrumentFolder[color] || 'defaultInstrument'; 
//   const sampleFile = `${instrumentFolder}${sampleNumber}.wav`;
//   const filePath = `/audio/${instrumentFolder}/${sampleFile}`;
//   const audioBuffer = await loadAudioBuffer(filePath); 

//   const settings = instrumentSettings[instrumentFolder] || {
//     attack: 0.1, decay: 0.2, sustain: 0.7, release: 0.3, detuneMin: -0.005, detuneMax: 0.005, baseVolume: 0.5, sustainMultiplier: 100
//   };

//   const randomAmplitudeVariation = getRandomVariation(0.8, 1); 
//   const adjustedVolume = Math.min((1 / Math.sqrt(polyphonyCount)) * settings.baseVolume * randomAmplitudeVariation, 1);

//   const source = audioCtx.createBufferSource();
//   const gainNode = audioCtx.createGain();
//   const filterNode = audioCtx.createBiquadFilter(); 

//   const detuneAmount = getRandomVariation(settings.detuneMin, settings.detuneMax); 
//   source.playbackRate.value = 1 + detuneAmount; 

//   const baseCutoffFrequency = 11000; 
//   filterNode.type = 'lowpass';
//   filterNode.frequency.setValueAtTime(baseCutoffFrequency + getRandomVariation(-1000, 1000), audioCtx.currentTime); 

//   source.buffer = audioBuffer;
//   source.connect(filterNode);
//   filterNode.connect(gainNode);
//   gainNode.connect(audioCtx.destination);

//   const attack = settings.attack;
//   const decay = settings.decay;
//   const sustainLevel = settings.sustain;
//   const release = settings.release;

//   const sustainDuration = (settings.sustainMultiplier / playbackSpeed); 

//   const currentTime = audioCtx.currentTime;

//   gainNode.gain.setValueAtTime(0, currentTime);
//   gainNode.gain.linearRampToValueAtTime(adjustedVolume, currentTime + attack);
//   gainNode.gain.linearRampToValueAtTime(sustainLevel * adjustedVolume, currentTime + attack + decay);
//   gainNode.gain.setValueAtTime(sustainLevel * adjustedVolume, currentTime + attack + decay + sustainDuration);
//   gainNode.gain.linearRampToValueAtTime(0, currentTime + attack + decay + sustainDuration + release);

//   source.start(currentTime);
  
//   // Stop the source after the sustain and release phases
//   source.stop(currentTime + attack + decay + sustainDuration + release);

//   // Store the active source, associated with its line
//   activeSources.push({ source, lineId });
// };

// // Function to stop any active sounds associated with a particular line
// export const stopSoundsForLine = (lineId) => {
//   console.log(`Stopping sounds for lineId: ${lineId}`);
//   activeSources = activeSources.filter(({ source, lineId: id }) => {
//     if (id === lineId) {
//       try {
//         source.stop();
//       } catch (err) {
//         console.error('Error stopping sound source:', err);
//       }
//       return false; // Remove the source from activeSources
//     }
//     return true; // Keep the other sources
//   });
// };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { mapNoteToSampleNumber, mapColorToInstrumentFolder } from './soundMappings'; // Import both mappings

// Initialize the Web Audio context globally
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Cache for audio buffers to avoid reloading sounds repeatedly
const bufferCache = {};

// Store references to active audio sources
let activeSources = [];

// Master gain node to control overall volume
const masterGainNode = audioCtx.createGain();
masterGainNode.gain.value = 0.8; // Set the initial master volume (adjustable)

// Create a limiter (dynamics compressor) to prevent clipping
const limiterNode = audioCtx.createDynamicsCompressor();
limiterNode.threshold.setValueAtTime(-6, audioCtx.currentTime); // Start limiting at -6 dB
limiterNode.knee.setValueAtTime(0, audioCtx.currentTime); // Hard knee for abrupt limiting
limiterNode.ratio.setValueAtTime(20, audioCtx.currentTime); // High ratio, acts like a limiter
limiterNode.attack.setValueAtTime(0.003, audioCtx.currentTime); // Fast attack to catch peaks
limiterNode.release.setValueAtTime(0.25, audioCtx.currentTime); // Short release

// Connect the master gain to the limiter, and then connect to audio context destination
masterGainNode.connect(limiterNode);
limiterNode.connect(audioCtx.destination);

// Function to load an audio buffer for a specific sample
const loadAudioBuffer = async (filePath) => {
  if (bufferCache[filePath]) {
    return bufferCache[filePath]; // Return cached buffer if it exists
  }

  const response = await fetch(filePath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

  bufferCache[filePath] = audioBuffer; // Cache the loaded buffer
  return audioBuffer;
};

// Define ADSR, detuning, base volume, and sustain settings for each instrument
const instrumentSettings = {
  bass: { attack: 0, decay: 0.3, sustain: 0.8, release: 0.5, detuneMin: -0.005, detuneMax: 0.005, baseVolume: 0.4, sustainMultiplier: 150 },
  epiano: { attack: 0.01, decay: 0.2, sustain: 0.7, release: 0.4, detuneMin: -0.001, detuneMax: 0.001, baseVolume: 0.4, sustainMultiplier: 200 },
  floom: { attack: 0, decay: 0.2, sustain: 0.9, release: 0.3, detuneMin: -0.002, detuneMax: 0.002, baseVolume: 0.4, sustainMultiplier: 180 },
  guitar: { attack: 0, decay: 0.3, sustain: 0.7, release: 0.5, detuneMin: -0.005, detuneMax: 0.005, baseVolume: 0.2, sustainMultiplier: 300 },
  marimba: { attack: 0, decay: 0.1, sustain: 0.7, release: 0.3, detuneMin: -0.002, detuneMax: 0.002, baseVolume: 0.4, sustainMultiplier: 300 },
  pianohigh: { attack: 0, decay: 0.3, sustain: 0.6, release: 0.4, detuneMin: -0.0001, detuneMax: 0.0001, baseVolume: 0.4, sustainMultiplier: 250 },
  pianolow: { attack: 0, decay: 0.4, sustain: 0.6, release: 0.5, detuneMin: -0.0001, detuneMax: 0.0001, baseVolume: 0.3, sustainMultiplier: 200 },
  strings: { attack: 0, decay: 0.5, sustain: 0.4, release: 0.7, detuneMin: -0.005, detuneMax: 0.005, baseVolume: 0.2, sustainMultiplier: 20 },
  synthflute: { attack: 0, decay: 0.25, sustain: 0.7, release: 0.4, detuneMin: -0.003, detuneMax: 0.003, baseVolume: 0.3, sustainMultiplier: 160 }
};

// Function to generate slight random variations
const getRandomVariation = (min, max) => Math.random() * (max - min) + min;

export const playSound = async (color, note, polyphonyCount = 1, playbackSpeed, lineId, colorInstrumentMap) => {
  const instrumentFolder = colorInstrumentMap[color] || 'defaultInstrument';

  if (!color || color === 0) {
    console.error('Invalid color passed:', color);
    return;
  }

  const sampleNumber = mapNoteToSampleNumber[note];
  if (!sampleNumber) {
    console.error(`No sample number found for note: ${note}`);
    return;
  }

  const sampleFile = `${instrumentFolder}${sampleNumber}.wav`;
  const filePath = `/audio/${instrumentFolder}/${sampleFile}`;
  const audioBuffer = await loadAudioBuffer(filePath);

  const settings = instrumentSettings[instrumentFolder] || {
    attack: 0.1, decay: 0.2, sustain: 0.7, release: 0.3, detuneMin: -0.005, detuneMax: 0.005, baseVolume: 0.5, sustainMultiplier: 100
  };

  const randomAmplitudeVariation = getRandomVariation(0.7, 1); 
  const adjustedVolume = Math.min((1 / Math.sqrt(polyphonyCount)) * settings.baseVolume * randomAmplitudeVariation, 1);

  const source = audioCtx.createBufferSource();
  const gainNode = audioCtx.createGain();
  const filterNode = audioCtx.createBiquadFilter();

  const detuneAmount = getRandomVariation(settings.detuneMin, settings.detuneMax);
  source.playbackRate.value = 1 + detuneAmount;

  const baseCutoffFrequency = 11000;
  filterNode.type = 'lowpass';
  filterNode.frequency.setValueAtTime(baseCutoffFrequency + getRandomVariation(-1000, 1000), audioCtx.currentTime);

  source.buffer = audioBuffer;
  source.connect(filterNode);
  filterNode.connect(gainNode);
  gainNode.connect(masterGainNode); // Connect each gainNode to the master gain node

  const attack = settings.attack;
  const decay = settings.decay;
  const sustainLevel = settings.sustain;
  const release = settings.release;
  const sustainDuration = (settings.sustainMultiplier / playbackSpeed);

  const currentTime = audioCtx.currentTime;

  gainNode.gain.setValueAtTime(0, currentTime);
  gainNode.gain.linearRampToValueAtTime(adjustedVolume, currentTime + attack);
  gainNode.gain.linearRampToValueAtTime(sustainLevel * adjustedVolume, currentTime + attack + decay);
  gainNode.gain.setValueAtTime(sustainLevel * adjustedVolume, currentTime + attack + decay + sustainDuration);
  gainNode.gain.linearRampToValueAtTime(0, currentTime + attack + decay + sustainDuration + release);

  source.start(currentTime);
  
  source.stop(currentTime + attack + decay + sustainDuration + release);

  // Store the active source, associated with its line
  activeSources.push({ source, lineId });
};

// Function to stop any active sounds associated with a particular line
export const stopSoundsForLine = (lineId) => {
  activeSources = activeSources.filter(({ source, lineId: id }) => {
    if (id === lineId) {
      try {
        source.stop();
      } catch (err) {
        console.error('Error stopping sound source:', err);
      }
      return false; // Remove the source from activeSources
    }
    return true; // Keep the other sources
  });
};

// Function to adjust the master volume
export const setMasterVolume = (volume) => {
  masterGainNode.gain.value = Math.max(0, Math.min(volume, 1)); // Volume range: 0 (mute) to 1 (full)
};