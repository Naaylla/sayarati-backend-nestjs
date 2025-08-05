import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const account = this.accountRepository.create({
      ...createAccountDto,
      profiles: [],
    });

    await this.accountRepository.insert(account);

    const { password: _, ...accountWithoutPassword } = account;

    return accountWithoutPassword;
  }

  async findAll() {
    const accounts = await this.accountRepository.find();

    return accounts;
  }

  async findByEmail(email: string) {
    const account = await this.accountRepository.findOne({
      where: {
        email,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const { password: _, ...accountWithoutPassword } = account;

    return account;
  }

  async findById(id: number) {
    const account = await this.accountRepository.findOne({
      where: {
        id,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const { password: _, ...accountWithoutPassword } = account;

    return account;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.accountRepository.update(id, updateAccountDto);

    return account;
  }
}
