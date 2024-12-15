class SoundManager {
  constructor() {
    // Initialize Band.js conductor
    this.conductor = new BandJS();
    this.conductor.setTempo(400);
    
    // Initialize sound presets
    this.initializeSounds();
  }

  initializeSounds() {
    // Gunshot preset - higher pitch and shorter duration for less intensity
    this.gunshotPreset = {
      tempo: 800, // Faster tempo for shorter overall sound
      notes: [
        { duration: 'thirtySecond', pitch: 'E3' }, // Higher pitch than before
        { duration: 'thirtySecond', pitch: 'C3' }  // Higher pitch than before
      ]
    };
    
    // Hit sound preset - higher pitched, shorter sound
    this.hitPreset = {
      tempo: 600,
      notes: [
        { duration: 'thirtySecond', pitch: 'E4' },
        { duration: 'thirtySecond', pitch: 'C4' }
      ]
    };
  }

  playSound(preset) {
    // Create new conductor instance for each sound to allow overlapping
    const sound = new BandJS();
    sound.setTempo(preset.tempo);
    
    const instrument = sound.createInstrument('square');
    
    // Add all notes from the preset
    preset.notes.forEach(note => {
      instrument.note(note.duration, note.pitch);
    });
    
    sound.finish().play();
  }

  playGunshot() {
    this.playSound(this.gunshotPreset);
  }

  playHit() {
    this.playSound(this.hitPreset);
  }
}

export default SoundManager;