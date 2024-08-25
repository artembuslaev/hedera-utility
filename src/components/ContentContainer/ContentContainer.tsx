import { useState } from 'react';
import { CreateAccountContainer } from '../CreateAccountContainer/CreateAccountContainer';
import { ProgressSpinner } from 'primereact/progressspinner';
import './ContentContainer.css';
import { TransferContainer } from '../TransferContainer/TransferContainer';
export function ContentContainer(props: any) {
    const [loading, setLoading] = useState(false);

    const actionRender = (action: number) => {
        switch (action) {
            case 0:
                return (
                    <CreateAccountContainer
                        setLoading={setLoading}
                        accountState={props.accountState}
                        keyState={props.keyState}
                    ></CreateAccountContainer>
                );
            case 1:
                return (
                    <TransferContainer
                        setLoading={setLoading}
                        accountState={props.accountState}
                        keyState={props.keyState}
                    ></TransferContainer>
                );
            default:
                return <h1>Action is not defined</h1>;
        }
    };
    return (
        <div className="content-container">
            {loading && (
                <div className="loading">
                    <ProgressSpinner />
                </div>
            )}
            {actionRender(props.action)}
        </div>
    );
}
