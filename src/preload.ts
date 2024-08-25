// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron/renderer';

contextBridge.exposeInMainWorld('api', {
    getBalance: (account: string, key: string) =>
        ipcRenderer.invoke('getBalance', account, key),
    createAccount: (account: string, key: string, balance: string) =>
        ipcRenderer.invoke('createAccount', account, key, balance),
    onUpdateBalance: (callback: (balance: string) => void | Promise<void>) =>
        ipcRenderer.on(
            'onUpdateBalance',
            async (_event, balance) => await callback(balance)
        ),
    openLink: (link: string) => ipcRenderer.send('openLink', link),
    transfer: (
        account: string,
        key: string,
        dstAccount: string,
        amount: number
    ) => ipcRenderer.invoke('transfer', account, key, dstAccount, amount),
});
