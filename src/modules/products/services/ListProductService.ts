import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const products = productsRepository.find();

    return products;
  }
}

export default ListProductService;
