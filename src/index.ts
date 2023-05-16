import express from 'express'
import cors from 'cors'
import { productRouter } from './router/productRouter'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.use("/products", productRouter)

//pratica 1. criar pasta dto e criar arquivo editProduct.dto.ts 
// - crie os dtos de entrada e de saida desse endpoint e o schema que sera validado pelo zod
// pratica 2

// - refatore o editProduct da camada Controller para que o zod valide o schema
// - refatore o editProduct da camada Business para que o parâmetro da função seja o 
// DTO de entrada, e a saída da função seja o DTO de saída 