export class Book {
  bookID: number;
  title: string;
  ISBN: string;
  set(field: string, value: string) {
    if (field === 'bookID') {
      this.bookID = Number(value);
    } else if (field === 'title') {
      this.title = value;
    } else if (field === 'ISBN') {
      this.ISBN = value;
    }
  }

  static parseResultToBookList(res):Book[] {
  let allBooks: Book[] = [];
  let b: Book;
  res.forEach(
    col => {
      if (String(col.metadata.colName) == 'bookID') {
        if (b != undefined)
          allBooks.push(b);
        b = new Book();
      }
      b.set(String(col.metadata.colName), String(col.value));
    }
  )
  // console.log(allBooks);
  return allBooks;
}

}
