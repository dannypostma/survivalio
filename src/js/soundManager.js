class SoundManager {
  constructor() {
    // Initialize sound pool
    this.maxInstances = 10;
    this.soundPool = [];
    this.currentIndex = 0;
    
    // Create pool of BandJS instances
    for (let i = 0; i < this.maxInstances; i++) {
      this.soundPool.push({
        conductor: new BandJS(),
        isPlaying: false
      });
    }
    
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
      ],
    };
    
    // Hit sound preset - higher pitched, shorter sound
    this.hitPreset = {
      tempo: 600,
      notes: [
        { duration: 'thirtySecond', pitch: 'E4' },
        { duration: 'thirtySecond', pitch: 'C4' }
      ]
    };

    this.playerDamagedPreset = {
      tempo: 400,
      notes: [
        { duration: 'sixteenth', pitch: 'G4' },
        { duration: 'sixteenth', pitch: 'E4' },
        { duration: 'eighth', pitch: 'D4' },  // Longer final note for the "wo" ending
      ]
    };

    this.heartPickupPreset = {
      tempo: 600,
      notes: [
        { duration: 'sixteenth', pitch: 'A4' },
        { duration: 'sixteenth', pitch: 'B4' },
        { duration: 'eighth', pitch: 'F1' },  // Longer final note for the "wo" ending
      ]
    };

    this.gameOverPreset = {
      tempo: 100,
      notes: [
        { duration: 'sixteenth', pitch: 'G4' },
        { duration: 'sixteenth', pitch: 'E4' },
        { duration: 'eighth', pitch: 'D4' },  // Longer final note for the "wo" ending
      ]
    };

    this.startGamePreset = {
      tempo: 100,
      notes: [
        { duration: 'sixteenth', pitch: 'D4' },
        { duration: 'sixteenth', pitch: 'E4' },
        { duration: 'eighth', pitch: 'G4' },  // Longer final note for the "wo" ending
      ]
    };

  }

  playSound(preset) {
    // Find the next available (non-playing) sound instance
    let soundInstance = this.soundPool[this.currentIndex];
    
    // If current instance is playing, try to find a free one
    if (soundInstance.isPlaying) {
      const freeIndex = this.soundPool.findIndex(s => !s.isPlaying);
      if (freeIndex === -1) {
        // If all instances are playing, use the current one anyway
        soundInstance = this.soundPool[this.currentIndex];
      } else {
        soundInstance = this.soundPool[freeIndex];
        this.currentIndex = freeIndex;
      }
    }

    const conductor = soundInstance.conductor;
    conductor.setTempo(preset.tempo);

    const instrument = conductor.createInstrument('square');
    
    preset.notes.forEach(note => {
      instrument.note(note.duration, note.pitch);
    });
    
    // Mark as playing before starting
    soundInstance.isPlaying = true;
    
    // Play the sound and handle completion
    conductor.finish().play();
    
    // Set a timeout to mark the instance as available after the sound finishes
    // Using a conservative estimate of sound duration based on tempo and notes
    const estimatedDuration = (1000 / preset.tempo) * preset.notes.length * 1000;
    setTimeout(() => {
      soundInstance.isPlaying = false;
    }, estimatedDuration);
    
    // Move to next sound instance in pool
    this.currentIndex = (this.currentIndex + 1) % this.maxInstances;
  }

  playGunshot() {
    this.playSound(this.gunshotPreset);
  }

  playHit() {
    this.playSound(this.hitPreset);
  }

  playPlayerDamaged() {
    this.playSound(this.playerDamagedPreset);
  }

  playHeartPickup() {
    this.playSound(this.heartPickupPreset);
  }

  playGameOver() {
    this.playSound(this.gameOverPreset);
  }

  playStartGame() {
    this.playSound(this.startGamePreset);
  }
}

export default SoundManager;
