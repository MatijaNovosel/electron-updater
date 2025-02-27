export interface IElectronAPI {
  notifyAppLoaded: () => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
