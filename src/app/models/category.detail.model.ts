export interface CategoryDetailModel {
    id: string;
    name: string;
    results: number;
    values?: CategoryDetailModel[];
    path_from_root?: CategoryDetailModel[];
}
