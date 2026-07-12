# NOESANA | Brainwave-Sensing Headband & Dome Analytics

Noesana is a premium, state-of-the-art interactive landing page, hardware specification portal, and telemetry control dashboard demonstrating the world's most advanced mind-sensing EEG headband ecosystem. Designed with high-end glassmorphism, responsive micro-animations, custom style-matching 3D product renders, and functional browser-synthesized audio engines.

---

## 🚀 Key Features & Interactive Arenas

### 🧠 Interactive Brain Hotspot Lobe Mapper & Heatmap Slider (`/` Homepage)
Anatomical visual mapping showing cortical sensor alignment in real time. Hovering over Alpha, Beta, Theta, or Delta wave cards highlights active regions (Prefrontal Cortex, Temporal Lobe, Occipital Lobe, and Thalamus Core) on a custom SVG brain side-profile diagram using glowing neon-style blur filters.
- **EEG Heatmap Preset Slider**: Includes a range slider to simulate overall brainwave distributions across different states (Sleep/Delta, Meditate/Alpha, Resting/Balanced, and High Focus/Beta), lighting up lobes in customized heatmap color gradients.

### 🎧 True Stereo Binaural Beat Generator & Soundscape Mixer (`/` Homepage)
A real-time, closed-loop soundscape simulator utilizing the browser's Web Audio API. Mixer sliders control volume levels for Forest Rain, Deep Ocean, Cosmic Drone, and a frequency slider for the Binaural Pitch carrier tone. 
- **Stereo Spatial Panning**: Panning nodes split frequencies between the left channel (`binauralPitch` Hz) and the right channel (`binauralPitch + 10` Hz) to synthesize a true **10Hz Binaural Alpha entrainment beat** directly in your headphones.

### 📡 Real-Time Animated EEG Waveform Oscilloscope (`/analytics` Dashboard)
A high-performance simulated brainwave oscilloscope powered by `requestAnimationFrame` and SVG path math. When a session is active, the wave shape dynamically fluctuates based on the selected **Neural Bandwidth Mode**:
- **Focus (Beta)**: High-frequency, low-amplitude, jagged waves with physical muscle-activity noise artifacts.
- **Calm (Alpha/Theta)**: Medium-frequency, medium-amplitude, smooth flowing sinusoidal loops.
- **Sleep (Delta)**: Low-frequency, high-amplitude, rolling delta sweeps.

### 📶 BLE Bluetooth Pairing Simulator (`/analytics` Dashboard)
Simulates pairing the Gen-2 headband via Bluetooth Low Energy 5.3. Follows a step-by-step GATT connection sequence, followed by 6 dry electrode impedance tests (Frontal Fp1/Fp2, Temporal T3/T4, Occipital, Ground) to unlock live telemetry feed graphs.

### 💾 Local Telemetry Exporter (`/analytics` Dashboard)
Allows users to compile and download localized session logs, active calibration minutes, and biometric index reports as a formatted text file (`.txt`) directly through their browser.

### 🌬️ Audio-Guided Respiration Pacer (`/analytics` Dashboard)
Allows users to conduct breathing calibration sessions with real-time audio guidance. Synthesizes a guided sine wave that rises in pitch and volume during *Inhale* phases (150Hz -> 300Hz), holds steady, and ramps down during *Exhale* phases, facilitating eyes-free box breathing.

### 🎮 Focus Trainer Neuro-Game (`/analytics` Dashboard)
A gamified prefrontal biofeedback simulator. Clicking a **Focus Pulse** button triggers a simulated prefrontal Beta frequency spike, generating lift to levitate a custom mind orb. Users navigate the orb through scrolling obstacle pillars to test and train their focus limits.

### 📋 Cognitive Profile Quiz (`/pricing` Page)
An interactive diagnostic questionnaire evaluating user focus objectives, sleep habits, and stress indices. Computes user parameters to recommend tailored wave protocols, session durations, and purchase plans. CTA buttons automatically route users to checkout with the correct pre-selected plan.

### 📊 8-Hour Interactive Sleep Stage Histogram Explorer (`/technology/sleep`)
An interactive overnight sleep cycle timeline graph showing transitions between Wakefulness, REM, Light, and Deep sleep. Users can hover across the hours to inspect dynamic biometrics (average heart rates, dominant brainwave bands, and clinical spectral signatures).

### 📐 Interactive Hardware Anatomy Explorer (`/hardware`)
A 3D design breakdown displaying Front, Side, and Rear profile views of the headband. Features glowing hotspots that expand on hover to annotate sensors, processor pods, and elastomeric comfort adjustments.

### 💳 Dynamic Plan Checkout Selector (`/shop`)
A fully responsive multi-tier shopping board. Pre-fills user selections using URL parameter scanners (e.g., from the pricing quiz), allowing users to switch plans on the fly. Dynamically updates pricing breakdowns (subtotal, shipping, estimated tax, and totals), credit card validation states, processing simulation scripts, and printable order receipts.

---

## 🛠️ Technology Stack

- **Core**: React 18, React Router DOM (v6), Vite
- **Styling**: Vanilla CSS custom themes & tokens + Tailwind CSS configuration
- **Animation**: Framer Motion, requestAnimationFrame (canvas/SVG rendering loops)
- **Engine**: Web Audio API (sine/sawtooth oscillators, stereo panner nodes, gain controllers, and noise buffers)
- **Icons**: Lucide React

---

## 📂 Project Directory Structure

```
├── public/                 # Static assets & PWA manifest.json
├── src/
│   ├── assets/             # Style-matched 3D product renders
│   │   ├── hero_headband.png   # Front Profile view
│   │   ├── headband_side.png   # Side Profile view
│   │   ├── headband_back.png   # Rear Profile view
│   │   ├── charging_dock.png   # Charging Cradle Accessory
│   │   ├── travel_case.png     # Hardshell Travel Case Accessory
│   │   ├── headband_stand.png  # Desktop display stand
│   │   ├── vr_pod.png          # VR Sync Bridge Module
│   │   └── sensor_care.png     # Electrode Care Kit
│   ├── components/         # Core layout blocks (Navbar, Footer, Consent)
│   ├── pages/              # Primary routing views (Home, Analytics, Specs...)
│   ├── App.jsx             # Route definitions & contexts
│   ├── index.css           # Design tokens, variables, & animations
│   └── main.jsx            # React root mount script
├── README.md               # Technical documentation
└── package.json            # Script targets & dependencies
```

---

## 📦 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm installed.

### Installation
1. Clone or copy the project files to your directory.
2. Install dependencies:
   ```bash
   npm install
   ```

### Local Development
To run the local Vite development server:
   ```bash
   npm run dev
   ```
Open the local server URL (usually `http://localhost:5173`) in your browser.

### Production Build
To compile production-optimized assets inside the `dist` folder:
   ```bash
   npm run build
   ```
    
---

## 🛡️ Biometric Ethics & Privacy
Neural privacy is a fundamental human right. Noesana processes all microvolt EEG signals locally inside the Dome App container (encrypted using AES-256) and never shares or commercializes biometric logs with third-party networks.
