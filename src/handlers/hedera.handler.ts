import { IpcMain, shell, BrowserWindow } from 'electron';
import { HederaHelper } from '../helpers/hedera.helper';

async function callHedera(
    account: string,
    key: string,
    callback: (helper: HederaHelper) => any
) {
    return await callback(new HederaHelper(account, key));
}

async function callHederaWithUpdateBalance(
    account: string,
    key: string,
    callback: (helper: HederaHelper) => any,
    mainWindow: BrowserWindow
) {
    return await callHedera(account, key, async (helper) => {
        const result = await callback(helper);
        const balance = await helper.getBalance();
        mainWindow.webContents.send('onUpdateBalance', balance);
        return result;
    });
}

async function Handle(
    callback: () => any,
    throwError: boolean = false,
    mainWindow?: BrowserWindow
) {
    try {
        return await callback();
    } catch (error) {
        console.log(error);
        if (throwError) {
            mainWindow.webContents.send('error', error?.toString());
        }
    }
}

export function subscribeHandlers(channel: IpcMain, mainWindow: BrowserWindow) {
    channel.on('openLink', (_, link) => {
        shell.openExternal(link);
    });
    channel.handle('createAccount', async (_, account, key, balance) => {
        return await Handle(
            async () =>
                await callHederaWithUpdateBalance(
                    account,
                    key,
                    async (helper) => await helper.createAccount(balance),
                    mainWindow
                )
        );
    });

    channel.handle('getBalance', async (_, account, key) => {
        return await Handle(
            async () =>
                await callHedera(
                    account,
                    key,
                    async (helper) => await helper.getBalance()
                )
        );
    });

    channel.handle('transfer', async (_, account, key, dstAccount, amount) => {
        return await Handle(
            async () =>
                await callHederaWithUpdateBalance(
                    account,
                    key,
                    async (helper) => await helper.transfer(dstAccount, amount),
                    mainWindow
                )
        );
    });
}
