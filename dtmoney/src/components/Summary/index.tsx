import { Container } from './styles';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary() {
    const {transactions} = useTransactions();

    // const totalDeposits = transactions.reduce((acc, item) => {
    //     if (item.type === 'deposit') {
    //         return acc + item.value;
    //     }
    //     return acc;
    // }, 0);

    const sumary = transactions.reduce((acc, item) => {
        if (item.type === 'deposit') {
             acc.deposits += item.value;
             acc.total += item.value;
        } else {
            acc.withdraws += item.value;
            acc.total -= item.value;
        }
        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    });


    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(sumary.deposits)}
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="" />
                </header>
                <strong>-
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(sumary.withdraws)}
                </strong>
            </div>
            <div style={{background: 'var(--green)'}}>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(sumary.total)}
                </strong>
            </div>
        </Container>
    )
}
