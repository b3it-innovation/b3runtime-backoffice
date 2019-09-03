import { Category } from './../model/category.model';
import { AuthenticationUser } from 'app/auth/model/authentication-user.model';

export interface AddCategoryRequest {
    name: string
}

export interface AddCategoryResponse {
    category: Category
}

export interface DeleteCategoryRequest {
    category: Category
}

export interface DeleteCategoryResponse {
    category: Category
}

export interface GetCategoriesResponse {
    categories: Category []
}
