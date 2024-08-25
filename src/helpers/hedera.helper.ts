import {
    AccountBalanceQuery,
    AccountCreateTransaction,
    Client,
    Hbar,
    PrivateKey,
    Status,
    TransferTransaction,
} from '@hashgraph/sdk';

export class HederaHelper {
    client;
    constructor(account: string, key: string) {
        const client = Client.forTestnet();
        this.client = client.setOperator(account, key);
    }
    async createAccount(balance: string | number) {
        const newAccountPrivateKey = PrivateKey.generateED25519();
        const newAccountPublicKey = newAccountPrivateKey.publicKey;
        const newAccount = await new AccountCreateTransaction()
            .setKey(newAccountPublicKey)
            .setInitialBalance(new Hbar(balance))
            .execute(this.client);
        const getReceipt = await newAccount.getReceipt(this.client);
        return getReceipt.accountId.toString();
    }
    async getBalance() {
        const query = new AccountBalanceQuery().setAccountId(
            this.client.operatorAccountId
        );
        const accountBalance = await query.execute(this.client);
        return accountBalance.hbars.toString();
    }
    async transfer(account: string, amount: string | number) {
        const transaction = new TransferTransaction()
            .addHbarTransfer(this.client.operatorAccountId, new Hbar(-amount))
            .addHbarTransfer(account, new Hbar(amount));
        const txResponse = await transaction.execute(this.client);
        const receipt = await txResponse.getReceipt(this.client);
        return receipt.status === Status.Success;
    }
    close() {
        this.client.close();
    }
}
