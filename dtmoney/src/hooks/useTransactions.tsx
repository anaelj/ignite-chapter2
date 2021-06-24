import { createContext, ReactNode, useEffect, useState, useContext } from 'react';
import { api } from '../services/api';


interface ITransaction {
    id: number;
    title: string;
    value: number;
    type: string;
    category: string;
    createdAt: string;
}

//type ITransactionCreate = Pick<ITransaction, 'title' | 'value' | 'type' | 'category'>; também pode ser feito dessa forma, para herdar a interface e selecionar as propriedades
type ITransactionCreate = Omit<ITransaction, 'id' | 'createdAt'>;

interface ITransactionsContextData {
    transactions : ITransaction[];
    createTransaction : (transaction : ITransactionCreate) => Promise<void>;
}


interface ITransactionsProviderProps {
    children: ReactNode;
}

const TransactionsContext = createContext<ITransactionsContextData>(
    { } as ITransactionsContextData ) ;

export function TransactionsProvider({children}: ITransactionsProviderProps) {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    useEffect(() => { 
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions));
    }, [])
   
    async function createTransaction (transactionCreate : ITransactionCreate) {
        const response = await api.post('/transactions', 
            {...transactionCreate, createdAt: new Date() });
        const {transaction} = response.data;
        setTransactions([
            ...transactions,
            transaction
        ])
    }

    return (
        <TransactionsContext.Provider value={{transactions , createTransaction}}>
            {children}                
        </TransactionsContext.Provider>
    )
}

export function useTransactions () {
    const context = useContext(TransactionsContext);
    return context;
}
