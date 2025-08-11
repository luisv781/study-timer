import { IpcRenderer } from "electron";

declare global {
    interface Window {
        ipc: {
            setProgressBar: (number) => void;
            closeWindow: () => void;
            minimizeWindow: () => void;
            getLaunchArg: () => Promise<any>;
        }
    }
}
