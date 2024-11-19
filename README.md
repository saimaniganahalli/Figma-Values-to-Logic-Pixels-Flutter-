# Figma to Flutter

A Figma plugin that converts Figma's letter spacing and line height values to Flutter-compatible values.

Created by [Sai Maniganahalli](https://github.com/saimaniganahalli) | Design. Code. Hot Chocolate ☕️

## Features

- **Letter Spacing Conversion**: Automatically converts Figma's letter spacing values (px or %) to Flutter's logical pixels
- **Line Height Conversion**: Converts Figma's line height values to Flutter's height multiplier
- **Auto Line Height Detection**: Intelligently handles Figma's "Auto" line height setting
- **Code Preview**: Shows ready-to-use Flutter TextStyle code snippets
- **Real-time Updates**: Values update instantly when selecting different text layers

## How to Use

1. Select any text layer in Figma
2. The plugin will automatically show:
   - Font size
   - Current spacing/line height values
   - Converted Flutter values
   - Ready-to-use Flutter code snippets

## Formulas Used

### Letter Spacing
- For percentage values: `Result = (Spacing % ÷ 100) × Base Size`
- For pixel values: Direct conversion to logical pixels

### Line Height
- For percentage values: `height = Line Height % ÷ 100`
- For pixel values: `height = Line Height ÷ Font Size`
- For Auto: Uses standard multiplier (1.2)

## Development

Built with:
- Figma Plugin API
- TypeScript
- HTML/CSS
- Prism.js for code highlighting

## Version History

See [RELEASE_NOTES.md](./RELEASE_NOTES.md) for detailed version history.