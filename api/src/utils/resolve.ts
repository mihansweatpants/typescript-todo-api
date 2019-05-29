type Resolved<T> = [Error | null, T | null];

/**
 * Little helper to use instead of try/catch
 */
export async function resolve<T>(promise: Promise<T>): Promise<Resolved<T>> {
  try {
    const data = await promise;
    return [null, data] as Resolved<T>;
  }
  catch (err) {
    return [err, null];
  }
}
