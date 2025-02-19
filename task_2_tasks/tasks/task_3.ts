// Напишите и типизируйте функцию, выполняющую запрос за данными по переданному URL.
//Выведите их в консоль в формате: "ID: id, Email: email"

const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

const getData = (url: string): Promise<IComment[]> | never => {
    return fetch(url)
        .then((response: Response) => {
            if (!response.ok) {
                throw new Error(`status: ${response.status}`);
            }
            return response.json();
        })
}

getData(COMMENTS_URL)
    .then((data: IComment[]) : void => {
        data.forEach((post: IComment) => {
            console.log(`ID: ${post.id}, Email: ${post.email}`)
        })
    });

/**
 * ID: 1, Email: Eliseo...
 * ID: 2, Email: Jayne_Kuhic...
 * ID: 3, Email: Nikita...
 * ID: 4, Email: Lew...
 * ...
 */