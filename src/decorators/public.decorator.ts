import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '@/constants/meta.constant';

/**
 * Decorator that sets the controller method to public.
 * It should be used when authentication is not need.
 * It would basically avoid the guard
 * @returns
 */
export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true);
