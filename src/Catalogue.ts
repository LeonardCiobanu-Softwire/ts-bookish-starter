import { getFromDB } from "./app";
export class Catalogue {
  title: string;
  authorName: string;
  nrCopies: number;

  set(field: string, value: string) {
    if (field === 'title') {
      this.title = value;
    } else if (field === 'Author Name') {
      this.authorName = value;
    } else if (field === 'nrCopies') {
      this.nrCopies = Number(value);
    }
  }

  static parseResultToBookList(res): Catalogue[] {
    let allBooks: Catalogue[] = [];
    let c: Catalogue;
    res.forEach(
      col => {
        if (String(col.metadata.colName) == 'title') {
          if (c != undefined)
            allBooks.push(c);
          c = new Catalogue();
        }
        c.set(String(col.metadata.colName), String(col.value));
      }
    )
    // console.log(allBooks);
    return allBooks;
  }

  static async getResult(sqlQuery: string) {
    // try {
    const result = await getFromDB(sqlQuery);
    return result;
    // } catch {
    //   console.log("oops");
    //   return [];
    // }
  }

  static async parseCatalogueList(sqlQuery: string) {
    const result = await this.getResult(sqlQuery);
    let res = Catalogue.parseResultToBookList(result);
    return res;
  }
}
