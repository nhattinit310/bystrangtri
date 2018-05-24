export class PagedResult<T> {
    currentPage: number | number = 0;
    pageSize: number | number = 10;
    pageCount: number | string;
    total: number | string;
    items: T[];
    extraData: any;
}
