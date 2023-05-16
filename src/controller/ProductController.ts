import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { BaseError } from "../errors/BaseError";
import { EditProductSchema } from "../dto/editProduct.dto";
import { ZodError } from "zod";

export class ProductController {
//pratica 3 injecao de dependencia
  constructor(
    private productBusiness: ProductBusiness
  ){}

  public createProduct = async (req: Request, res: Response) => {
    try {

      const input = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price
      }

      // const productBusiness = new ProductBusiness()
      const output = await this.productBusiness.createProduct(input)

      res.status(201).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public getProducts = async (req: Request, res: Response) => {
    try {
      const input = {
        q: req.query.q
      }

      // const productBusiness = new ProductBusiness()
      const output = await this.productBusiness.getProducts(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public editProduct = async (req: Request, res: Response) => {
    try {


      //pratica 2
      //valida se os dados atendem ao schema, 
      //como por exemplo, se o ID do produto é um número válido e se o nome do produto
      // é uma string não vazia. "Parsear" significa converter um formato de dados em outro, de forma que 
      //os dados possam ser usados com mais facilidade em outra parte do código.
      // A função "EditProductSchema.parse()" faz a validação e a conversão dos dados, 
      // garantindo que eles estejam no
      // formato correto e possam ser facilmente manipulados pelo código.
      const input = EditProductSchema.parse({
        idToEdit: req.params.id,
        id: req.body.id,
        name: req.body.name,
        price: req.body.price
      })
                          //injecao de dependencia - PRATICA 3
                           //injecao de dependencia - PRATICA 3
                            //injecao de dependencia - PRATICA 3

      // const productBusiness = new ProductBusiness()
      const output = await this.productBusiness.editProduct(input)

      res.status(200).send(output)

        //pratica 3
        // refatore o catch de editProduct da camada Controller para capturar
        // erros do zod (ZodError)
        // - implemente a injeção de dependencias na Controller

    } catch (error) {
      console.log(error)
//pratica 3
      if(error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public deleteProduct = async (req: Request, res: Response) => {
    try {

      const input = {
        idToDelete: req.params.id
      }

      // const productBusiness = new ProductBusiness()
      const output = await this.productBusiness.deleteProduct(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }
}