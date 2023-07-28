import { AppError } from "./AppError"

describe('Utils: AppError', () => {
  it('should be show message in AppError', () => {
    const message = "test";
    const appError = new AppError(message);

    expect(appError.message).toBe(message);
  })
})