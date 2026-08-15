export const tv_fetch = "/tv-fetch";

export function fetchTVDetails(id) {
  return {
    type: tv_fetch,
    payload: id,
  };
}
