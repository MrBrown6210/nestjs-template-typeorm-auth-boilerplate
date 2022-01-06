import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './dto/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private jwtService: JwtService,
  ) {}
  public async signUp(signUpDto: SignUpDto) {
    const { email, password, firstName, lastName } = signUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      await this.user.insert({
        email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async login(loginDto: LoginDto) {
    console.log(loginDto);
    const { email, password } = loginDto;
    const user = await this.user.findOne({
      where: {
        email,
      },
    });
    console.log(user);
    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException();
    const payload: JwtPayload = {
      email,
      name: `${user.first_name} ${user.last_name}`,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
