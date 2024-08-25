import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import './App.css';
import { AccountContainer } from './components/AccountContainer/AccountContainer';
import { ContentContainer } from './components/ContentContainer/ContentContainer';

function App() {
    const accountState = useState('');
    const keyState = useState('');
    const actionState = useState(0);
    const actions = [
        {
            name: 'Create Account',
            value: 0,
        },
        {
            name: 'Transfer HBARs',
            value: 1,
        },
    ];
    return (
        <div className="App">
            <AccountContainer
                accountState={accountState}
                keyState={keyState}
                actionState={actionState}
                actions={actions}
            ></AccountContainer>
            <ContentContainer
                accountState={accountState}
                keyState={keyState}
                action={actionState[0]}
            ></ContentContainer>
        </div>
    );
}
const root = createRoot(document.getElementById('root'));
root.render(
    <PrimeReactProvider>
        <App></App>
    </PrimeReactProvider>
);
