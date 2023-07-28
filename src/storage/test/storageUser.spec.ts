import { UserDTO } from "../../dtos/UserDTO"
import { storageUserGet, storageUserRemove, storageUserSave } from "../storageUser";

describe('Storage: User', () => {
  const newUser: UserDTO = {
    avatar: 'https://github.com/eduardoarad.png',
    email: 'email@gmail.com',
    id: '1',
    name: 'Eduardo',
    tel: '(85) 99999-9999'
  }

  it("should be return object empty when don't have a user storaged", async () => {
    await storageUserSave(newUser);
    const user = await storageUserGet();

    expect(user).toStrictEqual(newUser);
  })
  it("should be return user storaged.", async () => {
    await storageUserSave(newUser);

    const user = await storageUserGet();

    expect(user.email).toBe('email@gmail.com');
  })
  it("should be remove user storaged.", async () => {
    await storageUserSave(newUser);
    await storageUserRemove();

    const user = await storageUserGet();
    expect(user).toStrictEqual({});
  })
})