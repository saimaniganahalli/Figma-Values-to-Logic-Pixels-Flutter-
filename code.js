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
});
// Handle text selection and value extraction
figma.on("selectionchange", () => {
    const selection = figma.currentPage.selection;
    if (selection.length === 0 || selection[0].type !== "TEXT") {
        figma.ui.postMessage({
            type: 'clear-fields'
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
    figma.ui.postMessage({
        type: 'update-values',
        fontSize,
        spacingValue,
        logicPixels: logicPixels.toFixed(2)
    });
});
