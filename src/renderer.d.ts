export interface IElectronAPI {
  notifyAppLoaded: () => void;
  update: () => void;
  quitAndInstall: () => void;
  checkForUpdates: () => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
