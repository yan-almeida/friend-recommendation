export class ArrayUtil {
  static unique<T>(array: T[], key: (prop: T) => string) {
    return [...new Map(array.map((prop) => [key(prop), prop])).values()];
  }
}
