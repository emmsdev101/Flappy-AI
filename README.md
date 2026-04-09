# Flappy-AI

A machine learning project implementing Artificial Neural Networks and Neuro Evolution to train an AI bird to play Flappy Bird autonomously.

## Overview

**Flappy-AI** demonstrates core machine learning concepts through an interactive game environment. The project trains a neural network using evolutionary algorithms to control a bird character that learns to navigate through pipes by itself.

## Technologies & Languages

- **Language**: JavaScript
- **Concepts**: Artificial Neural Networks, Neuro Evolution (NEAT algorithm)
- **Visualization**: Game-based UI with interactive learning

## Project Structure

The project consists of the following core files:

- **`index.html`** - Main entry point for the web-based application
- **`main.js`** - Game loop and simulation engine
- **`NeuralNetwork.js`** - Neural network implementation
- **`bird.js`** - Bird agent with AI control logic
- **`pipe.js`** - Obstacle generation and collision detection
- **Assets**: 
  - `bird.png` - Bird sprite
  - `pipe_top.png`, `pipe_bottom.png` - Pipe sprites
  - `ground.png`, `sky.png` - Background elements

## Features

- Neural network-based AI training
- Evolutionary algorithm for optimization
- Real-time game visualization
- Interactive learning experience
- Beginner-friendly code structure

## Getting Started

1. Clone the repository
2. Open `index.html` in a web browser
3. Watch as the AI learns to play the game through neuro evolution

## How It Works

The AI bird uses a neural network that takes input from the game environment (distance to pipes, bird position, etc.) and produces movement decisions. The population of birds evolves over generations, with the best performers selected to "breed" and pass their neural network genes to the next generation.

## Inspiration

This project draws inspiration from the [Coding Train](https://www.youtube.com/channel/UCvjgXvBlbOiRbHOd6IQJmww) YouTube channel's machine learning series.

## License

Open source project - feel free to use, modify, and learn from the code.

---

For questions or suggestions, feel free to open an issue or contribute to the project!