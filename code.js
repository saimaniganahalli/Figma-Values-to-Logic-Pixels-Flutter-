"use strict";
/// <reference types="@figma/plugin-typings" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Initial show with default height
figma.showUI(__html__, {
    width: 400,
    height: 600,
    themeColors: true
});
// Single message handler for all UI messages
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'resize') {
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
});
// Handle text selection and value extraction
figma.on("selectionchange", () => {
    const selection = figma.currentPage.selection;
    if (selection.length === 0 || selection[0].type !== "TEXT") {
        figma.ui.postMessage({
            type: 'clear-fields',
            showPlaceholder: true
        });
        return;
    }
    const textNode = selection[0];
    const fontSize = textNode.fontSize;
    const letterSpacing = textNode.letterSpacing;
    let spacingValue = '';
    let logicPixels = 0;
    if (typeof letterSpacing === 'object' && letterSpacing !== null) {
        if (letterSpacing.unit === 'PERCENT') {
            spacingValue = `${letterSpacing.value}%`;
            logicPixels = letterSpacing.value === 0 ? fontSize : (letterSpacing.value / 100) * fontSize;
        }
        else if (letterSpacing.unit === 'PIXELS') {
            spacingValue = `${Number(letterSpacing.value).toFixed(2)}px`;
            logicPixels = letterSpacing.value === 0 ? fontSize : letterSpacing.value;
        }
    }
    else if (typeof letterSpacing === 'number') {
        spacingValue = `${Number(letterSpacing).toFixed(2)}px`;
        logicPixels = letterSpacing === 0 ? fontSize : letterSpacing;
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
    }
    else if (typeof lineHeight === 'object' && lineHeight !== null) {
        if (lineHeight.unit === 'PERCENT') {
            lineHeightValue = `${lineHeight.value}%`;
            heightResult = lineHeight.value / 100;
        }
        else if (lineHeight.unit === 'PIXELS') {
            lineHeightValue = `${lineHeight.value}px`;
            heightResult = lineHeight.value / fontSize;
        }
    }
    else if (typeof lineHeight === 'number') {
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
