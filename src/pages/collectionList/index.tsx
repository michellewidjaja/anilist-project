import React, { useState } from 'react';
import { Card, CardContent, CardMedia, PageTitle, LineClamp, Button } from '../globalStyles';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import AddEditCollection from '../../components/AddEditCollection';
import LazyImage from '../../components/LazyImage';
import blankImage from '../../assets/blank_image.jpg';

export default function CollectionList() {
    const getCollectionList = localStorage.getItem('collectionList') || '';
    const parsedList = getCollectionList ? JSON.parse(getCollectionList) : {};

    const navigate = useNavigate();
    const totalPreviewImg = 4;

    const goToCollectionDetail = (key: string) => {
        navigate(`/collectionDetail?collection=${key}`)
    }

    return (
        <>
            <PageTitle css={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
            `}>
                My Collection
                <AddEditCollection action="add" />
            </PageTitle>
            <div css={css`
                    display: grid;
                    grid-template-columns: ${Object.keys(parsedList).length > 0 ? '1fr 1fr' : '1fr'};
                    grid-gap: 10px;

                    @media (min-width: 1200px) {
                        grid-template-columns: repeat(3, 1fr);
                    }
                `}>
                {
                Object.keys(parsedList).length > 0 ?
                Object.keys(parsedList)?.map((k: string) => {
                    const totalItem = parsedList[k].length || 0;
                    const showEmptyImg = totalItem ? (totalPreviewImg - totalItem) : 1;

                    return (
                        <Card key={`listCollection-${k}`}>
                            <CardMedia css={css`
                                display: grid;
                                grid-template-columns: repeat(${totalItem < 2 ? 1 : 2}, 1fr);
                                height: 160px;
                            `}>
                                {
                                    parsedList[k]?.slice(0, 4)
                                    .map((v2: any, k2: string) => {
                                        return (
                                            <LazyImage 
                                                key={`listImg-${k2}`} 
                                                src={v2.coverImage} 
                                                height={totalItem < 2 ? '200px' : '80px'}
                                                width={'100%'}
                                                css={css`
                                                    width: 100%;
                                                    height: ${totalItem < 2 ? '200px' : '80px'}!important;
                                                    object-fit: cover;
                                                `} 
                                            />
                                        )
                                    }) 
                                }
                                {
                                    showEmptyImg > 0 && 
                                        Array.from(Array(showEmptyImg).keys())
                                        ?.map((k3: number) => (
                                            <LazyImage key={`imgEmpty-${k3}`}
                                                src={blankImage} 
                                                height={'80px'}
                                                width={'100%'}
                                                css={css`
                                                    width: 100%;
                                                    height: ${totalItem < 2 ? '160px' : '80px'}!important;
                                                    object-fit: contain!important;
                                                `} 
                                            />
                                    ))
                                }
                            </CardMedia>
                            <CardContent css={css`
                                display: flex;
                                justify-content: space-between;
                                flex-direction: column;
                            `}>
                                <div css={css`font-size: 18px;`}>
                                    <LineClamp line="1">{k}</LineClamp>
                                </div>
                                <div css={css`
                                    display: flex;
                                    justify-content: flex-end;
                                `}>
                                    <AddEditCollection action="edit" collectionData={k} />
                                    <Button small variant="invert">
                                        <FontAwesomeIcon icon={faEye} onClick={() => { goToCollectionDetail(k)}} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                }) :
                    <div>There is no collection data</div>
                }
            </div>
        </>
    )
}