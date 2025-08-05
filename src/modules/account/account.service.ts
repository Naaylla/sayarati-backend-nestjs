import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private accountRepository: Repository<Account>,
  ) {}

  async findAll() {
    const accounts = await this.accountRepository.find();
    console.log({ accounts });

    return accounts;
  }
}
