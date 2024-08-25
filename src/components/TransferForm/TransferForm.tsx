import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import './TransferForm.css';
import { InputText } from 'primereact/inputtext';

export function TransferForm(props: any) {
    return (
        <form className="transfer-form">
            <FloatLabel>
                <InputText
                    value={props.accountState[0]}
                    onChange={(e) => props.accountState[1](e.target.value)}
                    className="transfer-form__input"
                    id="account"
                />
                <label htmlFor="account">Account</label>
            </FloatLabel>
            <FloatLabel>
                <InputNumber
                    value={props.amountState[0]}
                    onChange={(e) => props.amountState[1](e.value)}
                    className="transfer-form__input"
                    id="amount"
                />
                <label htmlFor="amount">Amount</label>
            </FloatLabel>
        </form>
    );
}
