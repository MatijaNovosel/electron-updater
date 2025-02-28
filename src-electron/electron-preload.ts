import { contextBridge, ipcRenderer } from "electron";

function domReady(condition: DocumentReadyState[] = ["complete", "interactive"]) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      return parent.appendChild(child);
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find((e) => e === child)) {
      return parent.removeChild(child);
    }
  }
};

function useLoading() {
  const className = "background-spinner";
  const styleContent = `
    @keyframes square-spin {
      25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
      50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
      75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
      100% { transform: perspective(100px) rotateX(0) rotateY(0); }
    }
    .${className} > #spinner {
      animation-fill-mode: both;
      width: 100px;
      height: 100px;
      background: #fff;
      animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
    }
    .${className} > #loading-status {
      margin-top: 75px;
      color: white;
      font-size: 40px;
      font-weight: bold;
      font-family: "Roboto";
    }
    .${className} {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .app-loading-wrap {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      background: #282c34;
      z-index: 9999;
    }
  `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");

  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `
  <div class="${className}">
    <div id="spinner"></div>
    <div id="loading-status">
      Loading
    </div>
  </div>`;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      setTimeout(() => {
        safeDOM.remove(document.head, oStyle);
        safeDOM.remove(document.body, oDiv);
      }, 2000);
    }
  };
}

const { appendLoading, removeLoading } = useLoading();

domReady().then(() => {
  appendLoading();
});

contextBridge.exposeInMainWorld("electronAPI", {
  notifyAppLoaded: removeLoading,
  update: () => {
    ipcRenderer.invoke("downloadUpdate");
  },
  quitAndInstall: () => {
    ipcRenderer.invoke("quitAndInstall");
  },
  checkForUpdates: () => {
    ipcRenderer.invoke("checkForUpdates");
  }
});
