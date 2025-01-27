import DB from '@/databases';

class StockValidationService {
	public Product = DB.Product;

	public async stockCheck(
		data: Array<{ productCode: string; quantity: number }>,
	): Promise<any> {
		try {
			const results = await Promise.all(data.map(async (item) => {
				const product = await this.Product.findOne({
					where: { code: item.productCode },
					attributes: ['id', 'quantity'],
				});

				if (!product) {
					return {
						productCode: item.productCode,
						valid: false,
						remainingStock: 0,
					}
				}
				const isValid = item.quantity <= product.quantity;

				return {
					productCode: item.productCode,
					valid: isValid,
					remainingStock: isValid ? product.quantity : product.quantity - item.quantity,
				};
			}));

			return results;
		} catch (error) {
			throw error;
		}
	}

}

export default StockValidationService;
