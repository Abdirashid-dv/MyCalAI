# MyCalAI - Nutrition and Calorie Tracking App

## Overview

MyCalAI is a comprehensive mobile application for tracking daily nutrition intake, managing food diaries, and monitoring nutritional goals. Built with React Native and Expo, this app provides an intuitive interface for logging meals, tracking calories and macronutrients, and maintaining a health diary.

## Features

-   **Food Logging System**: Track your meals across breakfast, lunch, dinner, and snacks
-   **Nutrition Tracking**: Monitor calories, protein, carbs, and fat intake daily
-   **Customizable Goals**: Set and manage personalized nutrition targets
-   **Food Database**: Browse and search a diverse food database with nutritional information
-   **History Tracking**: Review past meal logs and nutrition patterns
-   **User Profiles**: Manage your personal settings and preferences

## Screenshots

_(Note: Add screenshots of your app here when available)_

## Tech Stack

-   React Native / Expo
-   TypeScript
-   React Navigation (Expo Router)
-   Zustand (State Management)
-   AsyncStorage (Local Storage)
-   Lucide React Native (Icons)

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn
-   Expo CLI
-   iOS Simulator or Android Emulator (optional for mobile testing)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/mycalai.git
cd mycalai
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm start
# or
yarn start
```

### Running the App

-   **Web**: Press `w` after starting the development server
-   **iOS**: Press `i` after starting the development server (requires MacOS and Xcode)
-   **Android**: Press `a` after starting the development server (requires Android Studio)
-   **Expo Go**: Scan the QR code with the Expo Go app on your device

## Project Structure

```
app/                  # Main app screens and navigation
  (tabs)/             # Tab navigation screens
  _layout.tsx         # Root layout component
assets/               # Images and static assets
components/           # Reusable UI components
mocks/                # Mock data (food database)
store/                # Zustand store and state management
types/                # TypeScript interfaces and types
```

## Usage

1. **Dashboard**: View your daily nutrition summary and add foods to each meal
2. **Foods**: Browse and search the food database
3. **History**: Review past nutrition logs
4. **Profile**: Manage your nutrition goals and app settings

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

-   Icons provided by Lucide React Native
-   Food database images from Unsplash
