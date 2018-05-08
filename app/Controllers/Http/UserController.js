"use strict";

const User = use("App/Models/User");
const Logger = use("Logger");

class UserController {
  async login({ request, auth, response }) {
    const { email, password } = request.post();
    const infos = await auth.withRefreshToken().attempt(email, password);
    response.status(200).send({ infos });
  }

  async refresh({ request, auth, response }) {
    const refreshToken = request.input("refresh_token");
    let logged = await auth.generateForRefreshToken(refreshToken);
    response.status(200).send(logged);
  }

  async register({ request, auth, response }) {
    const { email, password, username } = request.post();
    const user = await User.create({ email, password, username });
    const logged = await auth.attempt(email, password);
    response.status(200).send(logged);
  }

  logout({ request, auth, response }) {
    const user = auth.current.user;
    const token = auth.getAuthHeader();
    user
      .tokens()
      .where("token", token)
      .update({ is_revoked: true });
    response.status(201).send();
  }

  async me({ request, auth, response }) {
    let user = auth.user.toJSON();
    delete user.password;
    response.status(200).send(auth.user);
  }
}
module.exports = UserController;
