import { http } from ".";

export async function getListByPage(url, page = 1, pageSize = 10) {
  return (await http.get(url, {
    params: {
      pageNo: page,
      pageSize
    }
  }) as any)
}

export async function getList(url) {
  return (await http.get(url) as any)
}
