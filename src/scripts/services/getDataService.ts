import { apiAnonRoot } from './api';

// export class getProducts {
//   static async getList(): Promise<void> {
//     await apiAnonRoot
//       .categories()
//       .get()
//       // .products()
//       // .get({
//       //   queryArgs: {
//       //     limit: 10,
//       //   },
//       // })
//       // .get({
//       //   queryArgs: {
//       //     key: 'mn',
//       //     limit: 10,
//       //   },
//       // })
//       .execute()
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// }

export function getCatalogueDataMan(
  callback: (data: any) => HTMLElement,
  block: any
): void | any[] {
  apiAnonRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: 'categories.id:"bea90c56-89ac-477a-9979-6ade2c7dada9"',
        limit: 10,
      },
    })
    .execute()
    .then((response) => {
      response.body.results.forEach((item) => block.append(callback(item)));
    })
    .catch((error) => {
      console.log(error);
    });
}

// export async function getCatalogueDataWoman(): Promise<void> {
//   await apiAnonRoot
//     .categories()
//     //.products()
//     .get({
//       // queryArgs: {
//       //   key: 'wmn',
//       //   limit: 5,
//       // },
//     })
//     .execute()
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
