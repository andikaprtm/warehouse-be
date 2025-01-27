import DB from '@/databases';

class DashboardService {
	public Product = DB.Product;
	public TransactionModel = DB.Transaction;

	public async getDashboardData(year = null) {
		try {
			if (!year) {
				year = new Date().getFullYear();
			}

			const result = {
				availableProducts: 0,
				totalAvailableProductQuantity: 0,
				transactionData: []
			};

			result.totalAvailableProductQuantity = await this.Product.sum('quantity', {
				where: {
					quantity: {
						[DB.Sequelize.Op.gt]: 0
					}
				}
			});

			result.availableProducts = await this.Product.count({
				where: {
					quantity: {
						[DB.Sequelize.Op.gt]: 0
					}
				}
			});

			const months = Array.from({ length: 12 }, (_, i) => ({
				month: i + 1,
				monthWord: new Date(year, i).toLocaleString('default', { month: 'long' }),
				count: 0,
				sumTotalQuantity: 0,
				details: []
			}));

			if (year) {
				const moment = require('moment');

				if (year) {
					const startDate = moment(year, 'YYYY').startOf('year').toDate(); // January 1st of the given year
					const endDate = moment(year, 'YYYY').endOf('year').toDate(); // December 31st of the given year

					const query = `
						SELECT 
							EXTRACT(MONTH FROM created_at) AS month,
							COUNT(id) AS count,
							SUM(total_quantity) AS "sumTotalQuantity"
						FROM 
							transaction
						WHERE 
							created_at >= :startDate AND created_at < :endDate
							AND deleted_at IS NULL
						GROUP BY 
							month
					`;

					console.log({ startDate, endDate });

					const transactionCounts = await DB.sequelize.query(query, {
						replacements: { startDate, endDate },
						type: DB.Sequelize.QueryTypes.SELECT
					}) as Array<{
						month: number,
						count: number,
						sumTotalQuantity: number
					}>;

					for (const transaction of transactionCounts) {
						console.log(`First: ${moment(year, 'YYYY').month(transaction.month - 1).startOf('month').toDate()} | Second: ${moment(year, 'YYYY').month(transaction.month).startOf('month').toDate()}`);
						const monthIndex = transaction.month - 1;
						months[monthIndex].count = Number(transaction.count);
						months[monthIndex].sumTotalQuantity = Number(transaction.sumTotalQuantity);
						months[monthIndex].details = await this.TransactionModel.findAll({
							where: {
								createdAt: {
									[DB.Sequelize.Op.gte]: moment(year, 'YYYY').month(transaction.month - 1).startOf('month').toDate(),
									[DB.Sequelize.Op.lt]: moment(year, 'YYYY').month(transaction.month).startOf('month').toDate()
								}
							},
							attributes: ['deliveryOrderNumber', 'totalQuantity'],
						});
					}
				}

			}

			result.transactionData = months;

			return result;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}




}

export default DashboardService;
