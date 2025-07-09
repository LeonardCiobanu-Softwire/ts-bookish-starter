import { getFromDB } from "./app";
export class User {
  userID: number;
  userName: string;
  
  set(field: string, value: string) {
    if (field === 'userID') {
      this.userID = Number(value);
    } else if (field === 'userName') {
      this.userName = value;
    }
  }

  static parseResultToUserList(res): User[] {
    let allUsers: User[] = [];
    let u: User;
    res.forEach(
      col => {
        if (String(col.metadata.colName) == 'userID') {
          if (u != undefined)
            allUsers.push(u);
          u = new User();
        }
        u.set(String(col.metadata.colName), String(col.value));
      }
    )
    // console.log(allBooks);
    return allUsers;
  }

  static async getResult(sqlQuery: string) {
    try {
    const result = await getFromDB(sqlQuery);
    return result;
    } catch {
      console.log("oops");
      return [];
    }
  }

  static async parseUserList(sqlQuery: string) {
    const result = await this.getResult(sqlQuery);
    let res = User.parseResultToUserList(result);
    return res;
  }  
}
