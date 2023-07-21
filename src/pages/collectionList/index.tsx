import React, { useState } from 'react';
import { Card, CardContent, CardMedia, PageTitle } from '../globalStyles';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { CollectionContainer } from './styles';

import AddEditCollection from '../../components/AddEditCollection';

export default function CollectionList() {
    const getCollectionList = localStorage.getItem('collectionList') || '';
    const parsedList = getCollectionList ? JSON.parse(getCollectionList) : {};

    console.log('tes', parsedList);

    const navigate = useNavigate();

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
            <CollectionContainer>
                {Object.keys(parsedList)?.map((k: string) => {
                    return (
                        <Card key={k}>
                            <CardMedia position='top' css={css`
                                height: 170px;
                                overflow: hidden;
                            `}>
                                {
                                    parsedList[k]?.map((v2: any, k2: string) => (
                                        <img src={v2.coverImage} alt="cover"
                                            css={css`
                                                height: 80px !important;
                                            `} 
                                        />
                                    ))
                                }
                            </CardMedia>
                            <CardContent css={css`
                                display: flex;
                                justify-content: space-between;
                                flex-direction: row;
                            `}>
                                <div css={css`font-size: 18px;`}>{k}</div>
                                <div>
                                    <AddEditCollection action="edit" />
                                    <FontAwesomeIcon icon={faEye} onClick={() => { goToCollectionDetail(k)}} />
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </CollectionContainer>
        </>
    )
}