'use strict';

import { DataTypes, Model, Sequelize } from 'sequelize';

export interface User {
	id: number;
	name: string;
	username: string;
	password: string;
	role: number;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export class UserModel extends Model<User> implements User {
	public id!: number;
	public name!: string;
	public username!: string;
	public password!: string;
	public role!: number;
	public createdAt?: Date;
	public updatedAt?: Date;
	public deletedAt?: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
	UserModel.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(150),
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING(150),
				allowNull: false,
			},
			role: {
				type: DataTypes.SMALLINT,
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				field: 'created_at',
				allowNull: true,
			},
			updatedAt: {
				type: DataTypes.DATE,
				field: 'updated_at',
				allowNull: true,
			},
			deletedAt: {
				type: DataTypes.DATE,
				field: 'deleted_at',
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'user',
			modelName: 'User',
			paranoid: true,
		}
	);
	return UserModel;
}
