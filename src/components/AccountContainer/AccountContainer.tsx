import './AccountContainer.css';
import { AccountForm } from '../AccountForm/AccountForm';
import hederaLogo from '../../../assets/hedera-logo.png';
import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

export function AccountContainer(props: any) {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        console.log('update-balance')
        window.api.onUpdateBalance(setBalance);
    }, []);

    useEffect(() => {
        window.api
            .getBalance(props.accountState[0], props.keyState[0])
            .then(setBalance);
    }, [props.accountState[0], props.keyState[0]]);
    return (
        <div className="account-container">
            <img
                src={hederaLogo}
                className="account-container__logo"
                onClick={() => window.api.openLink('http://portal.hedera.com')}
            ></img>
            <div className="account-container__form">
                <AccountForm
                    accountState={props.accountState}
                    keyState={props.keyState}
                ></AccountForm>
            </div>
            <div
                className="account-container__info"
                style={{
                    visibility: [undefined, null, ''].includes(balance)
                        ? 'hidden'
                        : 'visible',
                }}
            >
                <span>Balance: {balance}</span>
            </div>
            <div className="account-container__action">
                <Dropdown
                    style={{ width: '100%' }}
                    value={props.actionState[0]}
                    onChange={(e) => props.actionState[1](e.value)}
                    options={props.actions}
                    optionLabel="name"
                />
            </div>
        </div>
    );
}
