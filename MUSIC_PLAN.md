# Generative Music Plan for War Game

## Core Concept
Use the entropic nature of the War card game to generate deterministic, shareable music. Each game state produces unique musical sequences that loop and evolve as the game progresses.

## Musical Mapping System

### Players as Instruments
- **Player 1 & Player 2**: Each represented by different instruments playing simultaneous sequences
- **Hand size**: Determines number of notes in each player's sequence
- **Loop synchronization**: Both sequences loop at same tempo, notes spread evenly across loop duration

### Harmonic System
- **Normal play**: Consonant scales (pentatonic: C-D-E-G-A)
- **War events**: Dissonant scales (octatonic: alternating half/whole steps)
- **Scale root**: Determined by cards in play (sum of ranks?)

### Pitch & Rhythm Mapping
- **Card ranks (2-14 + Jokers)**: Map to scale degrees/pitches
- **Sequence timing**: `noteDuration = loopDuration / sequenceLength`
- **Loop length**: 4-8 beats for good musical phrasing
- **Tempo**: Potentially tied to game speed slider

### Instrument Selection
- **Option A**: General MIDI instruments (rank % 128)
- **Option B**: Synthesized timbres via oscillator mixing
  - Rank determines oscillator type
  - Suit determines filter/effects or instrument families
  - Spades=percussion, Hearts=strings, etc.

## Technical Implementation
- **Web Audio API**: Real-time synthesis via Tone.js
- **Deterministic generation**: Game state as seed for reproducible music
- **URL shareability**: Same game seed = same musical experience
- **Scale transitions**: Immediate switch vs. gradual transition (TBD)

## Sequence Generation Logic
- **Input**: Current player hands + cards in play
- **Output**: Deterministic note sequences for each player
- **Harmony**: Determined by cards currently in play
- **Density**: Determined by cards in hand

## Open Questions
- Transition behavior between consonant/dissonant modes
- Rhythmic variation within sequences vs. steady spacing
- Exact pitch mapping strategy (higher ranks = higher pitches?)
- Loop tempo relationship to game speed