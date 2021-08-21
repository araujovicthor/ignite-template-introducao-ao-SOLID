import { AppError } from "../../../../errors/AppError";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const findUser = this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError("User does not exists");
    }

    if (findUser.admin !== true) {
      throw new AppError("User is not admin");
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
