import { Repository, getManager } from "typeorm";

/**
 * Base class for a repository
 * Required a repository type and repository class
 */
export class BaseRepository<T>
{
    private repository:Repository<T> | undefined;
    private entityClass: any;

    constructor(entity:any)
    {
        this.entityClass = entity;
    }
    
    async Save(entity: any) {
        let repository = this.GetRepository();
        return repository.save(entity);
    }

    GetNew():T
    {
        return new this.entityClass();
    }

    protected GetRepository()
    {
        if(!this.repository)
            this.repository = getManager().getRepository(this.entityClass);

        return this.repository;
    }
}
