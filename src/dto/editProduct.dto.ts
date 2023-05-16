// crie os dtos de entrada e de saida desse endpoint e o schema que sera validado pelo zod
import z from 'zod';

export interface EditProductInputDTO {
        idToEdit: string,
        id?: string, //  id: string | undefined,
        name?: string,
        price?: number 
}

export interface EditProductOutputDTO {
    message: string,
      product: {
        id: string,
        name: string,
        price: number,
        createdAt: string
      }
}

export const EditProductSchema = z.object({
    idToEdit: z.string(),
    id: z.string().min(1).optional(),
    name: z.string({
      invalid_type_error: "'Name' deve ser do tipo string"
    }).min(2).optional(),
    price: z.number().positive().min(0).gt(0).optional() //optional porque pode receber o dado ou undefined
}).transform(data => data as EditProductInputDTO) //a função "transform" retorna os dados 
// convertidos como uma instância da classe "EditProductInputDTO".