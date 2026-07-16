import { BaseRepository } from "./BaseRepository";
import { IUser, UserModel } from "../models/User.model";

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string, withPassword = false) {
    const query = this.model.findOne({ email: email.toLowerCase().trim() });
    if (withPassword) query.select("+passwordHash +otp +otpExpires +resetPasswordToken +resetPasswordExpires");
    return query.exec();
  }

  async findByGoogleId(googleId: string) {
    return this.model.findOne({ googleId }).exec();
  }

  async addRefreshToken(userId: string, token: string, expiresAt: Date, userAgent?: string, ip?: string) {
    return this.model.findByIdAndUpdate(
      userId,
      { $push: { refreshTokens: { token, expiresAt, userAgent, ip, createdAt: new Date() } } },
      { new: true },
    );
  }

  async removeRefreshToken(userId: string, token: string) {
    return this.model.findByIdAndUpdate(
      userId,
      { $pull: { refreshTokens: { token } } },
      { new: true },
    );
  }

  async clearRefreshTokens(userId: string) {
    return this.model.findByIdAndUpdate(userId, { $set: { refreshTokens: [] } }, { new: true });
  }

  async findByResetToken(hashedToken: string) {
    return this.model
      .findOne({ resetPasswordToken: hashedToken, resetPasswordExpires: { $gt: new Date() } })
      .select("+resetPasswordToken +resetPasswordExpires +passwordHash");
  }

  async findByIdWithSecrets(id: string) {
    return this.model
      .findById(id)
      .select("+passwordHash +otp +otpExpires +resetPasswordToken +resetPasswordExpires");
  }
}

export const userRepository = new UserRepository();
