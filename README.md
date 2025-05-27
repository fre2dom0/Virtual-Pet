# Virtual Pet Phaser

A delightful and interactive virtual pet desktop application built with Electron and Phaser. This project brings a lively animated pet to your desktop, always on top and seamlessly integrated with your workspace. Perfect for those who want a bit of fun and companionship while working or studying.

## Features

- **Transparent, Always-On-Top Window:** The pet appears to live directly on your desktop, without interfering with your workflow.
- **Animated Character:** Enjoy a variety of smooth animations, including idle, walk, run, jump, sleep, hurt, and multiple attack actions.
- **Physics-Based Movement:** Realistic pet movement powered by Phaser's arcade physics engine.
- **System Tray Integration:** Control the application from your system tray with options to show/hide the pet or quit the app.
- **Customizable Assets:** Easily swap out the pet's sprites and animations to create your own unique companion.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/virtual-pet-phaser.git
   cd virtual-pet-phaser
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the application:**
   ```bash
   npm start
   ```

## Usage
- The pet will appear on your desktop in a transparent, click-through window.
- Use the system tray icon to show/hide the pet or exit the application.
- The pet will animate and move around, providing a fun and interactive experience.

## Customization
- Replace the sprite images in the `assets/` directory to use your own pet graphics.
- Modify animation definitions in `src/data/animationMap.json` to add or change animations.
- Tweak physics and behavior in `src/core/Pet.js` for a personalized experience.

## Technologies Used
- [Electron](https://www.electronjs.org/): For building cross-platform desktop applications.
- [Phaser](https://phaser.io/): For rendering and animating the virtual pet.

## License

This project is licensed under the MIT License. 

---

Enjoy your new virtual desktop companion! 
