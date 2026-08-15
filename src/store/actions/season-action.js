export const fetch_season_endpoint = "/fetch-season";

export const fetchSeasonDetails = (series_id, season_no) => {
  return {
    type: fetch_season_endpoint,
    payload: { series_id, season_no },
  };
};
