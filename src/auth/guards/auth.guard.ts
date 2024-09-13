import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Additional custom logic can be added here

    // Ensure you call the parent method which handles the actual JWT validation
    const result = (await super.canActivate(context)) as boolean;
    return result;
  }
}
