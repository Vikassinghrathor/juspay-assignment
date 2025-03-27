# Sprite Animation Creator

## Overview
This is a Scratch-like web application that allows users to create simple animations by dragging and dropping programming blocks for different sprites. The application enables users to:
- Add multiple sprites
- Create animation sequences
- Move and rotate sprites
- Manage sprite interactions

## Features
- Drag-and-drop programming blocks
- Multiple sprite support
- Animation playback
- Sprite collision detection
- Customizable motion and repeat blocks

## Tech Stack
- React
- React Hooks
- Context API for state management
- Tailwind CSS for styling

## Prerequisites
- Node.js (v14 or later)
- npm or Yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/Vikassinghrathor/juspay-assignment.git
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

## Project Structure
- `src/App.js`: Main application component
- `src/context.js`: Global state management
- `src/components/`:
  - `Sidebar.js`: Programming blocks panel
  - `DropArea.js`: Area for dropping and arranging blocks
  - `PreviewArea.js`: Sprite animation preview
  - `CatSprite.js`, `ButterflySprite.js`, `BeetalSprite.js`: Sprite components

## Usage
1. Select a sprite from the bottom right corner
2. Drag programming blocks from the sidebar
3. Drop blocks into the mid-area
4. Click the green flag to play the animation

## Blocks Available
- Repeat
- Move Steps
- Turn Left
- Turn Right
- Go to Coordinates

## Sprite Interactions
- Collision detection between sprites
- Automatic sprite swapping on collision

## Contact
Your Name - rathorevikas2809@gmail.com

Project Link: https://juspay-assignment-phi.vercel.app/
