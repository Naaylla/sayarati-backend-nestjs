import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { Account } from '../account/entities/account.entity';
import { HashUtil } from 'src/core/utils/hash.util';

@Injectable()
export class AuthService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private accountRepository: Repository<Account>,
  ) {}
  async register(registerDto: RegisterDto) {
    const { email, password, confirmPassword } = registerDto;
    if (confirmPassword !== password) {
      throw new BadRequestException(
        'Password and confirm password do not match',
      );
    }
    const hashedPassword = await HashUtil.hash(password);

    const account = this.accountRepository.create({
      email,
      password: hashedPassword,
      profiles: [],
    });

    await this.accountRepository.insert(account);

    const { password: _, ...accountWithoutPassword } = account;

    return accountWithoutPassword;
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const account = await this.accountRepository.findOne({
      where: {
        email,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (!account.isVerified) {
      throw new UnauthorizedException('Account not verified');
    }

    const isValidPassword = await HashUtil.verify(account.password, password);

    if (!isValidPassword) {
      throw new NotFoundException('Password is incorrect');
    }
    const { password: _, ...accountWithoutPassword } = account;

    return accountWithoutPassword;
  }
}
