import { useQuery, gql } from "@apollo/client";

const GET_PEOPLE = gql`
  query GetAllPeople {
    allPeople {
      people {
        name
        skinColor
      }
    }
  }
`;

export function usePeopleList() {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  return {
    loading,
    error,
    data,
  };
}
