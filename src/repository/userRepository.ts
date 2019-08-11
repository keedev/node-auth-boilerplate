import { BaseRepository } from "./baseRepository";
import { User } from "../entity/user";

class UserRepository extends BaseRepository<User>{

    async GetEntity(email: string) {

        let entity = await this.LookForEntity(email);

        let user: User;
        if (entity) {
            user = entity;
        } else {
            user = new User();
            user.email = email;
        }
        return user;
    }

    async LookForEntity(email: string) {

        let repository = this.GetRepository();
        let entity = await repository.findOne({ email: email });
        return entity;
    }
}

const repository = new UserRepository(User);

export { repository as UserRepository }
