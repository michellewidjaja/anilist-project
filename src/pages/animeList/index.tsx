import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { css } from '@emotion/react';

//style
import { BadgeContainer, Badge, Card, CardTitle, CardContent, 
    CardMedia, LineClamp, PageTitle, Link } from '../globalStyles';
import { AnimeListContainer } from './styles';
import { GET_ANIME_LIST }  from '../../graphql/getAnimeList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import ReactPaginate from 'react-paginate';
import LazyImage from '../../components/LazyImage';

export default function AnimeList() {
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 10;

    const { loading, error, data: animeList } = useQuery(GET_ANIME_LIST, {
        variables: {
            page: currentPage,
            perPage: perPage
        }
    });
    const navigate = useNavigate();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const animeListMedia = animeList?.Page?.media;
    const pageInfo = animeList?.Page?.pageInfo;

    const pageCount = Math.ceil(pageInfo.total / pageInfo.perPage);

    const handlePageClick = (e: { selected: number }) => {
        setCurrentPage(e.selected + 1);
    }

    const goToDetailPage = (id: string) => {
        navigate(`detail?id=${id}`);
    }

    return (
        <>
            <PageTitle>Anime List</PageTitle>
            <AnimeListContainer>
                {
                    animeListMedia?.map((v: any,k: number) => (
                        <Card gridColumns="35% 65%" key={k} onClick={() => goToDetailPage(v.id)}>
                            <CardMedia position="left">
                                <LazyImage src={v.coverImage.large} />
                            </CardMedia>
                            <CardContent>
                                <div css={css`height: 100%`}>
                                    <div css={css`height: 80%`}>
                                        <CardTitle>{v.title.romaji}</CardTitle>
                                        <div css={css`color: #606666; font-size: 13px`}>{v.episodes} episode(s)</div>
                                        <BadgeContainer>
                                            {v.genres.map((v2: string, k2: number) => (
                                                <Badge key={k2}>{v2}</Badge>
                                            ))}
                                        </BadgeContainer>
                                        <LineClamp line="2" css={css`
                                            color: #606666; 
                                            margin: 10px 0; 
                                            font-size: 14px; 
                                            line-height: 18px;
                                        `} dangerouslySetInnerHTML={{__html: v.description}}></LineClamp>
                                    </div>
                                    <Link css={css`text-align: right`}>
                                        View Detail
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                }
            </AnimeListContainer>
            <ReactPaginate
                nextLabel="Next"
                onPageChange={handlePageClick}
                forcePage={pageInfo.currentPage - 1}
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                previousLabel="Previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </>
    )
}
