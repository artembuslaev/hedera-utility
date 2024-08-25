import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import './AccountForm.css';

export function AccountForm(props: any) {
    return (
        <form className="account-form">
            <IconField iconPosition="left">
                <InputIcon className="pi pi-user"></InputIcon>
                <InputText
                    value={props.accountState[0]}
                    onChange={(e) => props.accountState[1](e.target.value)}
                    className="account-form__input"
                    id="account"
                    placeholder="Account"
                />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-key"></InputIcon>
                <InputText
                    value={props.keyState[0]}
                    onChange={(e) => props.keyState[1](e.target.value)}
                    className="account-form__input"
                    type="password"
                    id="key"
                    placeholder="Key"
                />
            </IconField>
        </form>
    );
}
