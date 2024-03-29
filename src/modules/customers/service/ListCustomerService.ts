import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

//definindo uma interface customizado para exibição
interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}

class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const cutomersRepository = getCustomRepository(CustomersRepository);

    const customers = await cutomersRepository.createQueryBuilder().paginate(); //inserindo o paginate no metodo

    return customers as IPaginateCustomer;
  }
}

export default ListCustomerService;
