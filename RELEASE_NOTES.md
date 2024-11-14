# Release Notes - v1.0.0

## New Features
- **Letter Spacing Converter**
  - Auto-detection of font size and spacing values from selected text layers
  - Support for both percentage (%) and pixel (px) spacing values
  - Automatic conversion to Flutter-compatible logic pixels
  - Smart calculation: when spacing is 0 (px or %), logic pixels equals font size
  - One-click copy functionality with visual feedback
  - Clear formula display with visual explanation

- **UI Improvements**
  - Clean, intuitive tabbed interface
  - Visual feedback for copy actions (button state + toast notification)
  - Responsive input fields with read-only protection
  - 24px spacing between fields for better readability

## Coming Soon
- Line Height conversion functionality 

# Figma to Flutter Converter

A Figma plugin that converts Figma's text properties to Flutter-compatible values.

## Features

### Letter Spacing Conversion
- Automatically detects font size and letter spacing from selected text layers
- Supports both percentage (%) and pixel (px) spacing values
- Converts to Flutter-compatible logic pixels
- Special handling for zero spacing values (returns font size)
- One-click copy with visual feedback
- Clear formula explanation

### Formula
For percentage spacing values:
Result = (Spacing % ÷ 100) × Base Size


## Usage

1. Select a text layer in Figma
2. The plugin automatically detects and displays:
   - Font size (px)
   - Spacing value (in % or px)
   - Result in logic pixels
3. Click the copy button to copy the result
4. Use the copied value in your Flutter code

## Installation

1. Open Figma
2. Go to Menu > Plugins > Browse Plugins
3. Search for "Figma to Flutter Converter"
4. Click "Install"

## Coming Soon
- Line Height conversion functionality

## Support
If you encounter any issues or have suggestions, please file them on my GitHub repository.
