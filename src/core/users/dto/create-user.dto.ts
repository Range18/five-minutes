import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import {
  PASSWORD_MIN_LOWERCASE,
  PASSWORD_MIN_NUMBERS,
  PASSWORD_MIN_SYMBOLS,
  PASSWORD_MIN_UPPERCASE,
  PASSWORD_MINLENGTH,
} from '../user.constants';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsStrongPassword({
    minLength: PASSWORD_MINLENGTH,
    minSymbols: PASSWORD_MIN_SYMBOLS,
    minLowercase: PASSWORD_MIN_LOWERCASE,
    minNumbers: PASSWORD_MIN_NUMBERS,
    minUppercase: PASSWORD_MIN_UPPERCASE,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
