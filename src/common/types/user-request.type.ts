import { UserEntity } from '../../core/users/user.entity';

export type UserRequest = Pick<UserEntity, 'uuid' | 'username' | 'email'>;
