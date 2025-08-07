import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { HashUtil } from 'src/core/utils/hash.util';

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

    return { account: accountWithoutPassword };
  }

  async findByEmail(email: string) {
    const account = await this.accountRepository.findOneBy({
      email,
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return { account };
  }

  async findById(id: number) {
    const account = await this.accountRepository.findOne({
      where: { id },
      relations: {
        profiles: true,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const { password, ...accountWithoutPassword } = account;
    return { account: accountWithoutPassword };
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    await this.accountRepository.update({ id }, updateAccountDto);

    return;
  }

  async updatePassword(id: number, oldPassword: string, newPassword: string) {
    const account = await this.accountRepository.findOneBy({ id });
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const isValidPassword = await HashUtil.verify(
      account.password,
      oldPassword,
    );
    if (!isValidPassword) {
      throw new NotFoundException('Password is incorrect');
    }

    await this.accountRepository.update(
      {
        id,
      },
      {
        password: newPassword,
      },
    );
    return;
  }

  async delete(id: number) {
    await this.accountRepository.delete({ id });

    return;
  }
}
