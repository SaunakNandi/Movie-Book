export const person_fetch = "/fetch-person";
export const fetchActorDetails = (id) => {
  return {
    type: person_fetch,
    payload: id,
  };
};
