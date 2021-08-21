import { AppError } from "../../../../errors/AppError";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const findUser = this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError("User does not exists", 404);
    }

    const user = this.usersRepository.turnAdmin(findUser);

    return user;
  }
}

export { TurnUserAdminUseCase };
