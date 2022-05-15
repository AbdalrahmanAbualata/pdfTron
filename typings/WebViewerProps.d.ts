/**
 * This file was generated from WebViewer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export interface WebViewerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    textAttribute: EditableValue<string>;
    buttonAction?: ActionValue;
}

export interface WebViewerPreviewProps {
    class: string;
    style: string;
    textAttribute: string;
    buttonAction: {} | null;
}
