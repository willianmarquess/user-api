import { Inject, Injectable } from '@nestjs/common';
import { IDocumentStore } from 'ravendb';
import { User } from './../entities/user.entity';

@Injectable()
export class UserRepository{
    
    constructor(@Inject('contextdb') private contextdb: IDocumentStore) {}

    async save(user: User): Promise<User> {
        const session = this.contextdb.openSession();
        await session.store(user);
        await session.saveChanges();
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const session = this.contextdb.openSession();
        const user = await session.query(User).whereEquals("email", email).singleOrNull();
        return user;
    }

    async findById(id: string): Promise<User> {
        const session = this.contextdb.openSession();
        const user = await session.query(User).whereEquals("id", id).singleOrNull();
        return user;
    }

    async findAll(): Promise<Array<User>> {
        const session = this.contextdb.openSession();
        const users = await session.query(User).all();
        return users;
    }

    async remove(id: string): Promise<void> {
        const session = this.contextdb.openSession();
        await session.delete<User>(id);
        return await session.saveChanges();
    }

}