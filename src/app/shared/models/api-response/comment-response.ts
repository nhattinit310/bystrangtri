import { AuthorUser } from "../authorUser";

export class CommentResponse {
    authorUser: AuthorUser;
    content: string;
    createdDate: number;
}