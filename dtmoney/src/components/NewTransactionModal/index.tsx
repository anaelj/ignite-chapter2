import Modal from 'react-modal';
import { Container, RadioBox, TransactionTypeContainer } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal ({isOpen, onRequestClose} : NewTransactionModalProps) {
  
    const {createTransaction} = useTransactions();

    const [type, setType] = useState('deposit')
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');

    async function handleCreateNewTransaction (event: FormEvent){
        event.preventDefault();

      await createTransaction ({
            title,
            value,
            category,
            type           
       })

       setTitle('');
       setValue(0);
       setCategory('');
       setType('deposit');
       onRequestClose();

       
    }

    return (
    <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose} 
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
    >
        <button 
            type="button" 
            onClick={onRequestClose} 
            className="react-modal-close"
        >
            <img src={closeImg} alt="Fechar Modal"/>
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar transação</h2>
            <input 
                type="text" 
                placeholder="Título" 
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input 
                type="number" 
                placeholder="Valor" 
                value={value}
                onChange={e => setValue(Number(e.target.value))}
            />
            <TransactionTypeContainer>
                <RadioBox 
                    type="button"
                    onClick={()=> setType('deposit')}
                    isActive={type === 'deposit'}
                    activeColor="green"
                >
                    <img src={incomeImg} alt="Entrada"/>
                    <span>Entrada</span>
                </RadioBox>
                <RadioBox 
                    type="button"
                    onClick={()=> setType('withdraw')}
                    isActive={type === 'withdraw'}
                    activeColor="red"
                >
                    <img src={outcomeImg} alt="Saída"/>
                    <span>Saída</span>
                </RadioBox>
            </TransactionTypeContainer>

            <input 
                type="text" 
                placeholder="Categoria" 
                value={category}
                onChange={e => setCategory(e.target.value)}
            />
            <button type="submit">Cadastrar</button>

        </Container>
    </Modal>
  );
}

