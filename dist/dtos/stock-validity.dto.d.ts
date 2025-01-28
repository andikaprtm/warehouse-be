import 'reflect-metadata';
declare class StockCheckItemDto {
    productCode: string;
    quantity: number;
}
export declare class StockCheckDto {
    items: StockCheckItemDto[];
}
export {};
