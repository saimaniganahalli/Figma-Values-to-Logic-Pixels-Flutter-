# Figma to Flutter

A Figma plugin that converts Figma's letter spacing and line height values to Flutter-compatible values.

## Features

- **Letter Spacing Conversion**: Automatically converts Figma's letter spacing values (px or %) to Flutter's logical pixels
- **Line Height Conversion**: Converts Figma's line height values to Flutter's height multiplier
- **Real-time Updates**: Updates values as you select different text layers
- **Code Snippets**: Generates ready-to-use Flutter code snippets
- **Adaptive UI**: Dynamic interface that adjusts to content

## How to Use

1. Select any text layer in Figma
2. The plugin will automatically display:
   - Font size
   - Original spacing/line height values
   - Converted Flutter values
3. Copy the generated code snippet directly into your Flutter project

## Technical Details

- Handles both percentage and pixel values
- Automatically calculates line height for 'Auto' settings
- Preserves precision in calculations
- Uses Flutter's logical pixel system for consistent results

## Development

Built with:
- Figma Plugin API
- TypeScript
- HTML/CSS