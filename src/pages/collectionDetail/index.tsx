import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia,
    Link, PageTitle } from '../globalStyles';
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LazyImage from '../../components/LazyImage';

interface CollectionListItem {
    collectionName: string,
    animeId: string,
    animeTitle: string
}

export default function CollectionDetail() {
    const getCollectionList = localStorage.getItem('collectionList') || '';
    const parsedList = getCollectionList ? JSON.parse(getCollectionList) : {};

    const getQueryParams = () => {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    const selectedCollection = getQueryParams().get('collection');
    const collectionList = selectedCollection ? parsedList[selectedCollection] : {};

    const navigate = useNavigate();

    const handleRemoveFromList = (data: CollectionListItem) => {
        const currentCollection = parsedList[data.collectionName];
        const index = currentCollection.findIndex((v: CollectionListItem) => v.animeId === data.animeId);
        currentCollection.splice(index, 1);
        console.log('coll', currentCollection)
        const newItem = {
            ...parsedList,
            ...(selectedCollection &&  {
                [selectedCollection]: currentCollection
            })
        };
        console.log('data', newItem);
        localStorage.setItem('collectionList', JSON.stringify(newItem));
        navigate(`/collectionDetail?collection=${selectedCollection}`)
    }

    return (
        <>
            <Link onClick={() => navigate('/collection')} css={css`font-weight: 600`}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Back
            </Link>
            <PageTitle>Collection {selectedCollection}</PageTitle>
            {collectionList?.map((v: any, k: string) => {
                return (
                    <Card key={k} gridColumns="30% 70%" css={css`height: 80px`}>
                        <CardMedia position="left">
                            <LazyImage src={v.coverImage} />
                        </CardMedia>
                        <CardContent css={css`
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            flex-direction: row;
                        `}>
                            {v.animeTitle}
                            <FontAwesomeIcon icon={faTrash} onClick={() => handleRemoveFromList(v)} />
                        </CardContent>
                    </Card>
                )
            })}
        </>
    )
}