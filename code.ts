/// <reference types="@figma/plugin-typings" />

// Initial show with default height
figma.showUI(__html__, {
  width: 280,
  height: 480,
  themeColors: true
});

// Listen for resize messages from the UI
figma.ui.onmessage = (msg) => {
  if (msg.type === 'resize') {
    // Add a small buffer to prevent any potential scrolling
    figma.ui.resize(280, msg.height);
  } else if (msg.type === 'spacing-result') {
    console.log(`Spacing: ${msg.figmaValue} → ${msg.pixelValue}`);
    figma.ui.postMessage({ type: 'spacing-result', value: msg.value });
  } else if (msg.type === 'lineheight-result') {
    console.log(`Line Height: ${msg.figmaValue} → ${msg.pixelValue}`);
    figma.ui.postMessage({ type: 'lineheight-result', value: msg.value });
  }
};
