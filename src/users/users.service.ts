import { UserRepository } from './repositories/users.repository';
import { IDocumentStore } from 'ravendb';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists =  await this.userRepository.findByEmail(createUserDto.email);
    if(userExists) throw new HttpException('user already exists', HttpStatus.CONFLICT);
    const user = new User(createUserDto.email, createUserDto.password);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<Array<User>>{
    return await this.userRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user =  await this.userRepository.findById(id);
    if(!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user =  await this.userRepository.findById(id);
    if(!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return await this.userRepository.remove(id);
  }
}
