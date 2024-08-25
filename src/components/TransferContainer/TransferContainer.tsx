import './TransferContainer.css';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { TransferForm } from '../TransferForm/TransferForm';

export function TransferContainer(props: any) {
    const accountState = useState();
    const amountState = useState();
    return (
        <div className="transfer-container">
            <TransferForm
                accountState={accountState}
                amountState={amountState}
            ></TransferForm>
            <Button
                label="Transfer"
                onClick={() => {
                    props.setLoading(true);
                    window.api
                        .transfer(
                            props.accountState[0],
                            props.keyState[0],
                            accountState[0],
                            amountState[0]
                        )
                        .then((result: any) => {
                            console.log(result);
                            setTimeout(() => props.setLoading(false), 500);
                        });
                }}
            />
        </div>
    );
}
