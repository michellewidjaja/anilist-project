import React from 'react';
import { Card, CardTitle, CardContent, 
    Link, ListItem, Item, Button } from '../globalStyles';
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function CollectionDetail() {
    const getCollectionList = localStorage.getItem('collectionList') || '';
    const parsedList = getCollectionList ? JSON.parse(getCollectionList) : {};

    const navigate = useNavigate();

    const goToCollectionDetail = (key: string) => {
        navigate(`collectionDetail?name=${key}`)
    }

    return (
        <>
            <Card>
                <CardContent>
                    <CardTitle>Collection sesuatu</CardTitle>
                    <Card>
                        {Object.keys(parsedList)?.map((k: string) => {
                            return (
                                <div key={k}>
                                    {k}
                                    <FontAwesomeIcon icon={faEye} onClick={() => { goToCollectionDetail(k)}} />
                                </div>
                            )
                        })}
                    </Card>
                </CardContent>
            </Card>
        </>
    )
}