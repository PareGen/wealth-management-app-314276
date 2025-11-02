import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

@Injectable()
export abstract class GenericCrudService<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOne({ where });
  }

  async findOneOrFail(where: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.findOne(where);
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    const saved = await this.repository.save(entity);
    return saved as unknown as T;
  }

  async update(where: FindOptionsWhere<T>, data: Partial<T>): Promise<T> {
    const entity = await this.findOneOrFail(where);
    Object.assign(entity, data);
    return this.repository.save(entity);
  }

  async remove(where: FindOptionsWhere<T>): Promise<void> {
    const entity = await this.findOneOrFail(where);
    await this.repository.softRemove(entity);
  }
}
