import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import './CreateAccountFormResult.css';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

export function CreateAccountFormResult(props: any) {
    return (
        <form className="create-account-form-result">
            <IconField iconPosition="left">
                <InputIcon className="pi pi-user"></InputIcon>
                <InputText
                    value={props.account}
                    className="account-form__input"
                    id="account"
                    placeholder="Account"
                />
            </IconField>
            {/* <IconField iconPosition="left">
                <InputIcon className="pi pi-user"></InputIcon>
                <InputText
                    value={props.key}
                    className="account-form__input"
                    id="account"
                    placeholder="Account"
                />
            </IconField> */}
            <InputTextarea value={props.privateKey} className="account-form__input"></InputTextarea>
        </form>
    );
}
