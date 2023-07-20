import React, { useState } from 'react';
import { Card, CardContent, PageTitle } from '../globalStyles';
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';

export default function CollectionList() {
    const getCollectionList = localStorage.getItem('collectionList') || '';
    const parsedList = getCollectionList ? JSON.parse(getCollectionList) : {};

    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate();

    const goToCollectionDetail = (key: string) => {
        navigate(`collectionDetail?name=${key}`)
    }

    return (
        <>
            <PageTitle>My Collection</PageTitle>
            {Object.keys(parsedList)?.map((k: string) => {
                return (
                    <Card key={k}>
                        <CardContent css={css`
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            flex-direction: row;
                        `}>
                            <div css={css`font-size: 18px;`}>{k}</div>
                            <FontAwesomeIcon icon={faEye} onClick={() => { goToCollectionDetail(k)}} />
                        </CardContent>
                    </Card>
                )
            })}
        </>
    )
}