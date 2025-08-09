import { IpcRenderer } from "electron";

declare global {
    interface Window {
        ipc: {
            closeWindow: () => void;
            minimizeWindow: () => void;
        }
    }
}
