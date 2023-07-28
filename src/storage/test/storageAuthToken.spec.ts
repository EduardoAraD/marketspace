import {
  StorageAuthTokenProps,
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave
} from "../storageAuthToken";

describe('Storage: AuthToken', () => {
  const newAuthToken: StorageAuthTokenProps = {
    refresh_token: 'refresh',
    token: 'token',
  }
  it("should be return undefined when don't have a authToken storaged", async () => {
    const { refresh_token, token } = await storageAuthTokenGet();

    expect(refresh_token).toBe(undefined);
    expect(token).toBe(undefined);
  })
  it("should be return token and refresh_token storaged.", async () => {
    await storageAuthTokenSave(newAuthToken);

    const { token } = await storageAuthTokenGet();

    expect(token).toBe('token');
  })
  it("should be remove city storaged.", async () => {
    await storageAuthTokenSave(newAuthToken);
    await storageAuthTokenRemove();

    const { refresh_token, token } = await storageAuthTokenGet();
    expect(refresh_token).toBe(undefined);
    expect(token).toBe(undefined);
  })
})
