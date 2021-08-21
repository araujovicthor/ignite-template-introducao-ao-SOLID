import { AppError } from "../../../../errors/AppError";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const findUser = this.usersRepository.findByEmail(email);

    if (findUser) {
      throw new AppError("User email already exists");
    }

    const user = this.usersRepository.create({ email, name });

    return user;
  }
}

export { CreateUserUseCase };
