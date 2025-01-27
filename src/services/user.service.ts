import DB from '@/databases';
import { User } from '@/models/user.model';

import { HttpException } from '@/exceptions/HttpException';
import bcrypt from 'bcrypt';
import {
	generateAccessTokenAdmin,
} from '@/utils/utils.utils';

import { Op, Transaction } from 'sequelize';

class UserService {
	public User = DB.User;

	public async findUserById(id: number): Promise<User> {
		try {
			const user: User = await this.User.findByPk(id, {
				attributes: { exclude: ['password'] },
			});
			return user;
		} catch (error) {
			throw error;
		}
	}

	public async updateUser(data: any, transaction?: Transaction): Promise<any> {
		try {
			const user = await this.User.count({
				where: { id: data.id },
			});

			if (!user) {
				throw new HttpException(400, 'User not found');
			}

			const updateData: any = {};
			Object.keys(data).forEach((key) => {
				if (data[key] !== undefined && data[key] !== null) {
					if (key === 'password') {
						const salt = bcrypt.genSaltSync(10);
						const hash = bcrypt.hashSync(data[key], salt);
						updateData[key] = hash;
					} else {
						updateData[key] = data[key];
					}
				}
			});

			// Update the user
			const updated = await this.User.update(updateData, {
				where: { id: data.id },
				...(transaction ? { transaction } : {}),
			});

			if (!updated[0]) {
				throw new HttpException(500, 'Failed to update user');
			}

			return updated;
		} catch (error) {
			throw error;
		}
	}

	public async loginWeb(username: string, password: string): Promise<any> {
		try {
			const user: User = await this.User.findOne({
				where: {
					username: username,
				},
			});

			if (!user) {
				throw new HttpException(409, `username or password is wrong`);
			}

			const isPasswordMatch = await bcrypt.compare(password, user.password);

			if (!isPasswordMatch) {
				throw new HttpException(409, `username or password is wrong`);
			}

			const fullUser = await this.findUserById(user.id);

			const payload = {
				id: user.id,
				name: user.name,
				username: user.username,
				role: user.role,
			};

			const token = generateAccessTokenAdmin(payload);

			const result = {
				token: token,
				user: fullUser,
			};

			return result;
		} catch (error) {
			throw error;
		}
	}

	public async logout($token: string): Promise<any> {}
}

export default UserService;
