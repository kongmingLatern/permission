import { http } from ".";

export async function getListByPage(url, page = 1, pageSize = 10) {
  return (await http.get(url, {
    params: {
      page,
      pageSize
    }
  }) as any).records
}