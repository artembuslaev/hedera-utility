import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import './CreateAccountForm.css';

export function CreateAccountForm(props: any) {
    return (
        <form className="create-account-form">
            <FloatLabel>
                <InputNumber
                    value={props.balanceState[0]}
                    onChange={(e) => props.balanceState[1](e.value)}
                    className="create-account-form__input"
                    id="balance"
                />
                <label htmlFor="balance">Initial balance</label>
            </FloatLabel>
        </form>
    );
}
