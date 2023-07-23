import { gql } from '@apollo/client';

export const GET_ANIME_LIST = gql`
    query getAnimeList ($id: Int, $page: Int, $perPage: Int, $search: String) {
        Page (page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media (id: $id, search: $search) {
                id
                title {
                    romaji
                }
                type
                status
                startDate {
                    year
                    month
                    day
                }
                season
                episodes
                coverImage {
                    medium
                }
                description
                genres
                isFavourite
            }
        }
    }
`;