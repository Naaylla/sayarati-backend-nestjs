import { AuthGuard as PassportGuard } from '@nestjs/passport';

export class AuthGuard extends PassportGuard('jwt') {}
