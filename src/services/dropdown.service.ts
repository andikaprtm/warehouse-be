import DB from '@/databases';
import { ResponseList } from '@/interfaces/ResponseList.interface';
import { FindOptions, Op } from 'sequelize';

class DropdownService {
	public Unit = DB.Unit;
	public UnitSize = DB.UnitSize;
	public Type = DB.Type;

	public async unitDropdownList(
		page: number,
		dataPerPage: number,
		search: string = null,
		unitSizeId: any = null
	): Promise<ResponseList> {
		try {
			const offset = page * dataPerPage - dataPerPage;
			const condition: FindOptions = {
				offset: offset,
				limit: dataPerPage,
				where: {},
			};

			if (search) {
				const searchCondition = {
					[Op.or]: [
						{ code: { [Op.iLike]: `%${search}%` } },
						{ name: { [Op.iLike]: `%${search}%` } },
					],
				};

				condition.where = { ...condition.where, ...searchCondition };
			}

			if(unitSizeId){
				condition.where = {
					...condition.where,
					unit_size_id: unitSizeId
				}
				
			}

			const {count,rows} = await this.Unit.findAndCountAll(condition);

			const next = page * dataPerPage < count;

			const pageTotal = Math.ceil(count / dataPerPage);

			return {
				data: rows,
				page: page,
				dataPerPage: dataPerPage,
				count: count,
				next: next,
				totalCount: count,
				pageTotal: pageTotal,
			};
		} catch (error) {
			throw error;
		}
	}

	public async unitSizeDropdownList(
		page: number,
		dataPerPage: number,
		search: string = null,
		unitId:number = null
	): Promise<ResponseList> {
		try {
			const offset = page * dataPerPage - dataPerPage;
			const condition: FindOptions = {
				offset: offset,
				limit: dataPerPage,
				where: {},
			};


			if (search) {
				const searchCondition = {
					[Op.or]: [
						{ code: { [Op.iLike]: `%${search}%` } },
						{ name: { [Op.iLike]: `%${search}%` } },
					],
				};

				condition.where = { ...condition.where, ...searchCondition };
				
			}

			if (unitId) {
				condition.where = {
					...condition.where,
					unit_size_id: unitId
				}
			}

			const { count, rows } = await this.UnitSize.findAndCountAll(condition);

			const next = page * dataPerPage < count;

			const pageTotal = Math.ceil(count / dataPerPage);

			return {
				data: rows,
				page: page,
				dataPerPage: dataPerPage,
				count: count,
				next: next,
				totalCount: count,
				pageTotal: pageTotal,
			};
		} catch (error) {
			throw error;
		}
	}

	public async typeDropdownList(
		page: number,
		dataPerPage: number,
		search: string = null,
	): Promise<ResponseList> {
		try {
			const offset = page * dataPerPage - dataPerPage;
			const condition: FindOptions = {
				offset: offset,
				limit: dataPerPage,
				where: {},
			};


			if (search) {
				const searchCondition = {
					[Op.or]: [
						{ code: { [Op.iLike]: `%${search}%` } },
						{ name: { [Op.iLike]: `%${search}%` } },
					],
				};

				condition.where = { ...condition.where, ...searchCondition };
			}

			const { count, rows } = await this.Type.findAndCountAll(condition);

			const next = page * dataPerPage < count;

			const pageTotal = Math.ceil(count / dataPerPage);

			return {
				data: rows,
				page: page,
				dataPerPage: dataPerPage,
				count: count,
				next: next,
				totalCount: count,
				pageTotal: pageTotal,
			};
		} catch (error) {
			throw error;
		}
	}
}

export default DropdownService;
