# Figma to Logic Pixels Converter

A Figma plugin that converts Figma's letter spacing and line height values to Flutter-compatible logic pixels. Simply select a text layer to automatically calculate the conversion.

## Features

- Automatic value detection from selected text layers
- Letter spacing conversion from Figma percentage to logic pixels
- Line height conversion from Figma values to logic pixels
- Copy results with one click
- Works in both Figma and Dev mode

## Development Setup

1. Clone this repository

bash
git clone [your-repository-url]

2. Install dependencies

bash
npm install

3. Install Figma Plugin Typings
bash
npm install --save-dev @figma/plugin-typings

4. Build the plugin
bash
npm run build

## Usage

1. Select a text layer in Figma
2. The plugin will automatically detect and fill in the values
3. Choose between Letter Spacing or Line Height conversion
4. View the converted value in logic pixels
5. Click the copy button to copy the result

## Calculations

### Letter Spacing
- Formula: `Result = (Spacing % + 100) × Base Size`
- Example: If font size is 12px and letter spacing is -5%, result will be -0.6 logic pixels

### Line Height
- Supports both percentage and pixel values
- Automatically converts to appropriate logic pixels for Flutter

## Development

- Built with TypeScript
- Uses Figma Plugin API
- Supports both Figma and Dev mode
- Includes automatic value detection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Figma Plugin API Documentation
- Flutter Documentation for text styling