/// <reference types="@figma/plugin-typings" />

// Initial show with default height for spacing tab
figma.showUI(__html__, {
  width: 400,
  height: 520, // Initial height for spacing tab
  themeColors: true
});

// Single message handler for all UI messages
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'resize') {
    // Resize UI based on content height
    figma.ui.resize(400, msg.height);
  } 
  else if (msg.type === 'spacing-result') {
    const codeSnippet = `letterSpacing: ${msg.value}`;
    console.log(`Spacing: ${msg.figmaValue} → ${codeSnippet}`);
    figma.ui.postMessage({ 
      type: 'spacing-result', 
      value: msg.value,
      codeSnippet: codeSnippet 
    });
  } 
  else if (msg.type === 'lineheight-result') {
    const codeSnippet = `height: ${msg.value}`;
    console.log(`Line Height: ${msg.figmaValue} → ${codeSnippet}`);
    figma.ui.postMessage({ 
      type: 'lineheight-result', 
      value: msg.value,
      codeSnippet: codeSnippet 
    });
  } 
  else if (msg.type === 'copy-to-clipboard') {
    figma.ui.postMessage({ type: 'copied' });
  }
};

// Handle text selection and value extraction
figma.on("selectionchange", () => {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0 || selection[0].type !== "TEXT") {
    figma.ui.postMessage({
      type: 'clear-fields',
      showPlaceholder: true
    });
    // Add small delay to ensure UI updates before resizing
    setTimeout(() => {
      figma.ui.postMessage({ type: 'resize-request' });
    }, 100);
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
      logicPixels = letterSpacing.value * fontSize / 100;
    } else if (letterSpacing.unit === 'PIXELS') {
      spacingValue = `${Number(letterSpacing.value).toFixed(2)}px`;
      logicPixels = letterSpacing.value;
    }
  } else if (typeof letterSpacing === 'number') {
    spacingValue = `${Number(letterSpacing).toFixed(2)}px`;
    logicPixels = letterSpacing;
  }

  // Update the line height detection section
  const lineHeight = textNode.lineHeight;
  let lineHeightValue = '';
  let heightResult = 0;

  if (lineHeight === null || (typeof lineHeight === 'object' && 
      ((lineHeight.unit === 'PERCENT' && lineHeight.value === 0) || 
       (lineHeight.unit === 'AUTO')))) {
    // For Auto line height, calculate based on font size
    // 1.2 is a standard multiplier that provides good readability 
    // and matches default line height in many design systems
    const calculatedHeight = Math.round(fontSize * 1.2);
    lineHeightValue = `${calculatedHeight}px`; // Explicit pixel value for Auto
    heightResult = 1.2; // Store the multiplier
  } else if (typeof lineHeight === 'object' && lineHeight !== null) {
    if (lineHeight.unit === 'PERCENT') {
      lineHeightValue = `${lineHeight.value}%`;
      heightResult = lineHeight.value / 100;
    } else if (lineHeight.unit === 'PIXELS') {
      lineHeightValue = `${lineHeight.value}px`;
      heightResult = lineHeight.value / fontSize;
    }
  } else if (typeof lineHeight === 'number') {
    lineHeightValue = `${lineHeight}px`;
    heightResult = lineHeight / fontSize;
  }

  // Add debug logging
  console.log('Line Height Debug:', {
    lineHeight,
    fontSize,
    lineHeightValue,
    heightResult,
    type: lineHeight ? typeof lineHeight : 'null',
    rawHeight: textNode.height
  });

  // Update the message to include line height values
  figma.ui.postMessage({
    type: 'update-values',
    fontSize,
    spacingValue,
    logicPixels: logicPixels.toFixed(2),
    lineHeightValue, // This should now always have a value in px or %
    heightResult: heightResult.toFixed(2)
  });
});

// Define the LetterSpacing type
interface LetterSpacing {
  readonly value: number;
  readonly unit: 'PIXELS' | 'PERCENT';
}
