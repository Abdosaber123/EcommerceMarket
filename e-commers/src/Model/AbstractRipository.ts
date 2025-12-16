import { Model, MongooseUpdateQueryOptions, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery } from "mongoose";
import { filter } from "rxjs";

export abstract class AbstractRepository<T> {
    constructor(protected model: Model<T>) { }
    async create(item: Partial<T>) {
        const doc = new this.model(item)
        return await doc.save()
    }
    async get(filter: RootFilterQuery<T>, projection?: ProjectionType<T>, option?: QueryOptions<T>) {
        return await this.model.findOne(filter, projection, option)
    }
    async getAll(filter?: RootFilterQuery<T>, projection?: ProjectionType<T>, option?: QueryOptions<T>) {
        return await this.model.find(filter || {} , projection , option)
    }
    async limitPage() {
        return await this.model.countDocuments()
    }
    async getByQuery(filter:any, projection = {}, options = {}) {
        return await this.model.find(filter, projection, options);
    }
    async getBySort(filter:any, projection = {}, options = {}) {
        return await this.model.find(filter, projection, options);
    }
    async update(filter: RootFilterQuery<T>, update: UpdateQuery<T>, option?: MongooseUpdateQueryOptions<T>) {
        return await this.model.updateOne(filter, update, option)
    }
    async findById(filter: RootFilterQuery<T>, update?: UpdateQuery<T>, option?: QueryOptions<T>) {
        return await this.model.findById(filter, update, option)
    }
    async findByIdAndUpdate(filter: RootFilterQuery<T>, update: UpdateQuery<T>, option?: QueryOptions<T>) {
        return await this.model.findByIdAndUpdate(filter, update, option)
    }
    async findOneAndUpdate(filter: RootFilterQuery<T>, update: UpdateQuery<T>, option?: QueryOptions<T>) {
        return await this.model.findOneAndUpdate(filter, update, option)
    }
    async deleteOne(filter: RootFilterQuery<T>) {
        return await this.model.deleteOne(filter)
    }


}