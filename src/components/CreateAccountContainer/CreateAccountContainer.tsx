import { CreateAccountForm } from '../CreateAccountForm/CreateAccountForm';
import './CreateAccountContainer.css';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { CreateAccountFormResult } from '../CreateAccountFormResult/CreateAccountFormResult';

export function CreateAccountContainer(props: any) {
    const [account, setAccount] = useState('');
    const [key, setKey] = useState('');
    const balanceState = useState(0);
    return !account || !key ? (
        <div className="create-account-container">
            <CreateAccountForm balanceState={balanceState}></CreateAccountForm>
            <Button
                label="Create an Account"
                onClick={() => {
                    props.setLoading(true);
                    window.api
                        .createAccount(
                            props.accountState[0],
                            props.keyState[0],
                            balanceState[0]
                        )
                        .then((result: { account: string; key: string }) => {
                            if (result) {
                                setAccount(result.account);
                                setKey(result.key);
                            }
                            setTimeout(() => props.setLoading(false), 500);
                        });
                }}
            />
        </div>
    ) : (
        <div className="create-account-container">
            <CreateAccountFormResult
                account={account}
                privateKey={key}
            ></CreateAccountFormResult>
        </div>
    );
}
