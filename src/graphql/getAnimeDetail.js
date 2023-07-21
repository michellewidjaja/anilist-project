import { gql } from '@apollo/client';

export const GET_ANIME_DETAIL = gql`
    query getAnimeDetail ($id: Int) {
        Media (id: $id) {
            id
            title {
                romaji
            }
            type
            status
            description
            seasonYear
            episodes
            coverImage {
                large
                medium
            }
            bannerImage
            genres
            popularity
            streamingEpisodes {
                title
                thumbnail
                url
                site
            }
            genres
        }
    }

`;