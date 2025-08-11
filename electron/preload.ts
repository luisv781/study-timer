import { ipcRenderer, contextBridge } from "electron";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipc", {
    on(...args: Parameters<typeof ipcRenderer.on>) {
        const [channel, listener] = args;
        return ipcRenderer.on(channel, (event, ...args) =>
            listener(event, ...args)
        );
    },
    off(...args: Parameters<typeof ipcRenderer.off>) {
        const [channel, ...omit] = args;
        return ipcRenderer.off(channel, ...omit);
    },
    send(...args: Parameters<typeof ipcRenderer.send>) {
        const [channel, ...omit] = args;
        return ipcRenderer.send(channel, ...omit);
    },
    invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
        const [channel, ...omit] = args;
        return ipcRenderer.invoke(channel, ...omit);
    },

    // You can expose other APTs you need here.
    setProgressBar: (progress: number) =>
        ipcRenderer.send("set-progress-bar", progress),
    closeWindow: () => ipcRenderer.send("close-window"),
    minimizeWindow: () => ipcRenderer.send("minimize-window"),
    getLaunchArg: () => ipcRenderer.invoke("getLaunchArg"),
});
