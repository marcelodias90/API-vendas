import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const cutomersRepository = getCustomRepository(CustomersRepository);

    const customers = cutomersRepository.find();

    return customers;
  }
}

export default ListCustomerService;
