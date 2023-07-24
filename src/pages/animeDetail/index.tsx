
import React from 'react';
import { BadgeContainer, Badge, Card, CardTitle, CardContent, 
    Link, ListItem, Item } from '../globalStyles';
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ANIME_DETAIL } from '../../graphql/getAnimeDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import AddToCollection from '../../components/AddToCollection';
import LazyImage from '../../components/LazyImage';

export default function AnimeDetail() {
    const navigate = useNavigate();

    const getQueryParams = () => {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    const selectedId = getQueryParams().get('id');

    const { loading, error, data: animeDetail } = useQuery(GET_ANIME_DETAIL, {
        variables: {
            id: selectedId
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const detail = animeDetail?.Media;

    return (
        <>
            <Link onClick={() => navigate('/')} css={css`font-weight: 600`}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Back
            </Link>
            <Card>
                <CardContent>
                    <LazyImage src={detail.bannerImage}
                        css={css`
                            height: 100px;
                        `} />
                    <CardTitle css={css`
                        margin-top: 20px; 
                        margin-bottom: 10px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center
                    `}>
                        {detail.title.romaji}
                        <AddToCollection detail={detail} />
                    </CardTitle>
                    <BadgeContainer>
                        {detail.genres.map((v: string, k: number) => (
                            <Badge key={k}>{v}</Badge>
                        ))}
                    </BadgeContainer>
                    <div css={css`color: #606666`}>{detail.episodes} episode(s) &#x2022; {detail.status}</div> 
                    <div css={css`margin: 20px 0`} dangerouslySetInnerHTML={{__html: detail.description}}></div>
                </CardContent>
            </Card>
            {
                detail.streamingEpisodes.length > 0 && (
                    <Card>
                        <CardContent>
                            <CardTitle>Episodes List</CardTitle>
                            <ListItem>
                                {detail.streamingEpisodes?.map((v2: {
                                    title: string
                                }, k2: number) => (
                                    <Item key={k2}>{v2.title}</Item>
                                ))}
                            </ListItem>
                        </CardContent>
                    </Card>
                )
            }
        </>
    )
}