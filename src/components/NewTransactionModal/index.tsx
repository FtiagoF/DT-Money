import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import * as Dialog from '@radix-ui/react-dialog'
import { X, ArrowCircleUp, ArrowCircleDown } from 'phosphor-react'
import * as z from 'zod';

import { CloseButton, Content, Overlay, TransctionType, TransctionTypeButton } from './styles';

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  // type: z.enum(['income', 'outcome']),
});

type newTrasactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
   } = useForm<newTrasactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema)
  });

  async function handleCreateNewTransaction(data: newTrasactionFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log(data);
    
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
            <X size={24}/>
        </CloseButton>
        
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input type="text" 
            placeholder='Descrição' 
            required 
            {...register('description')}
          />
          <input type="number" 
            placeholder='Preço' 
            required 
            {...register('price', { valueAsNumber: true })}
          />
          <input type="text" 
            placeholder='Categoria' 
            required 
            {...register('category')}
          />
        
            <TransctionType>
              <TransctionTypeButton variant='income' value='income'>
                <ArrowCircleUp size={24} />
                Entrada
              </TransctionTypeButton>
              <TransctionTypeButton variant='outcome' value='outcome'>
                <ArrowCircleDown size={24} />
                Saída
              </TransctionTypeButton>
            </TransctionType>

            <button type="submit" disabled={isSubmitting}>Cadastrar</button>
        </form>

        
      </Content>
    </Dialog.Portal>
  );
}
