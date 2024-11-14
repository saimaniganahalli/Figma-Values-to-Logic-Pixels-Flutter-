/// <reference types="@figma/plugin-typings" />

// Initial show with default height
figma.showUI(__html__, {
  width: 400,
  height: 600,
  themeColors: true
});

// Single message handler for all UI messages
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'resize') {
    figma.ui.resize(400, msg.height);
  } 
  else if (msg.type === 'spacing-result') {
    console.log(`Spacing: ${msg.figmaValue} → ${msg.pixelValue}`);
    figma.ui.postMessage({ type: 'spacing-result', value: msg.value });
  } 
  else if (msg.type === 'lineheight-result') {
    console.log(`Line Height: ${msg.figmaValue} → ${msg.pixelValue}`);
    figma.ui.postMessage({ type: 'lineheight-result', value: msg.value });
  } 
  else if (msg.type === 'copy-to-clipboard') {
    // Send confirmation back to UI for the copy action
    figma.ui.postMessage({ type: 'copied' });
  }
};

// Handle text selection and value extraction
figma.on("selectionchange", () => {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0 || selection[0].type !== "TEXT") {
    figma.ui.postMessage({
      type: 'clear-fields'
    });
    return;
  }
  
  const textNode = selection[0] as TextNode;
  const fontSize = textNode.fontSize as number;
  const letterSpacing = textNode.letterSpacing;

  let spacingValue = '';
  let logicPixels = 0;

  if (typeof letterSpacing === 'object' && letterSpacing !== null) {
    if (letterSpacing.unit === 'PERCENT') {
      spacingValue = `${letterSpacing.value}%`;
      logicPixels = letterSpacing.value === 0 ? fontSize : (letterSpacing.value / 100) * fontSize;
    } else if (letterSpacing.unit === 'PIXELS') {
      spacingValue = `${Number(letterSpacing.value).toFixed(2)}px`;
      logicPixels = letterSpacing.value === 0 ? fontSize : letterSpacing.value;
    }
  } else if (typeof letterSpacing === 'number') {
    spacingValue = `${Number(letterSpacing).toFixed(2)}px`;
    logicPixels = letterSpacing === 0 ? fontSize : letterSpacing;
  }

  figma.ui.postMessage({
    type: 'update-values',
    fontSize,
    spacingValue,
    logicPixels: logicPixels.toFixed(2)
  });
});

// Define the LetterSpacing type
interface LetterSpacing {
  readonly value: number;
  readonly unit: 'PIXELS' | 'PERCENT';
}
