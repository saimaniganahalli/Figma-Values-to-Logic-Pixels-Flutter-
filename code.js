"use strict";
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
    }
    else if (msg.type === 'spacing-result') {
        console.log(`Spacing: ${msg.figmaValue} → ${msg.pixelValue}`);
        figma.ui.postMessage({ type: 'spacing-result', value: msg.value });
    }
    else if (msg.type === 'lineheight-result') {
        console.log(`Line Height: ${msg.figmaValue} → ${msg.pixelValue}`);
        figma.ui.postMessage({ type: 'lineheight-result', value: msg.value });
    }
};
figma.on("selectionchange", () => {
    const selection = figma.currentPage.selection;
    if (selection.length === 1 && selection[0].type === "TEXT") {
        const textNode = selection[0];
        // Get font size and letter spacing
        const fontSize = textNode.fontSize;
        const letterSpacing = textNode.letterSpacing;
        // Convert letter spacing to percentage
        let letterSpacingPercent = 0;
        if (typeof letterSpacing === 'number') {
            // If letterSpacing is in pixels
            letterSpacingPercent = (letterSpacing / fontSize) * 100;
        }
        else if (typeof letterSpacing === 'object' && 'unit' in letterSpacing) {
            // If letterSpacing is a LetterSpacing object
            if (letterSpacing.unit === 'PERCENT') {
                letterSpacingPercent = letterSpacing.value;
            }
        }
        // Get line height
        const lineHeight = textNode.lineHeight;
        let lineHeightValue = 0;
        let lineHeightType = 'auto';
        if (typeof lineHeight === 'number') {
            // If lineHeight is in pixels
            lineHeightValue = lineHeight;
            lineHeightType = 'pixels';
        }
        else if (lineHeight && typeof lineHeight === 'object' && 'unit' in lineHeight) {
            // If lineHeight is a LineHeight object
            if (lineHeight.unit === 'PERCENT') {
                lineHeightValue = lineHeight.value;
                lineHeightType = 'percent';
            }
        }
        // Send values to UI
        figma.ui.postMessage({
            type: 'update-values',
            fontSize,
            letterSpacingPercent,
            lineHeightType,
            lineHeightValue
        });
    }
});
