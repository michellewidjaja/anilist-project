import React, { useState } from 'react';
import { Card, CardContent, CardMedia,
    Link, PageTitle } from '../globalStyles';
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LazyImage from '../../components/LazyImage';
import ModalConfirmation from '../../components/ModalConfirmation';

interface CollectionListItem {
    collectionName: string,
    animeId: string,
    animeTitle: string
}

export default function CollectionDetail() {
    const getCollectionList = localStorage.getItem('collectionList') || '';
    const parsedList = getCollectionList ? JSON.parse(getCollectionList) : {};
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [selectedData, setSelectedData] = useState<CollectionListItem>();

    const getQueryParams = () => {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    const selectedCollection = getQueryParams().get('collection');
    const collectionList = selectedCollection ? parsedList[selectedCollection] : {};

    const navigate = useNavigate();

    const handleRemoveFromList = () => {
        if (selectedData) {
            const currentCollection = selectedData ? parsedList[selectedData.collectionName] : [];
            const index = currentCollection.findIndex((v: CollectionListItem) => v.animeId === selectedData.animeId);
            currentCollection.splice(index, 1);
            
            const newItem = {
                ...parsedList,
                ...(selectedCollection &&  {
                    [selectedCollection]: currentCollection
                })
            };
            
            localStorage.setItem('collectionList', JSON.stringify(newItem));
            navigate(`/collectionDetail?collection=${selectedCollection}`);
            handleModalConfirm();
        }
    }

    const handleModalConfirm = () => {
        setShowModalConfirm(!showModalConfirm);
    }

    const handleData = (data: CollectionListItem) => {
        setSelectedData(data);
        handleModalConfirm();
    }

    return (
        <>
            <Link onClick={() => navigate('/collection')} css={css`font-weight: 600`}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Back
            </Link>
            <PageTitle css={css`margin: 15px 0 25px;`}>Collection {selectedCollection}</PageTitle>
            <div css={css`
                @media (min-width: 1200px) {
                    display: grid;
                    grid-gap: 10px;
                    grid-template-columns: repeat(2, 1fr);
                }
            `}>
                {
                collectionList?.length > 0 ?
                collectionList?.map((v: any, k: string) => {
                    return (
                        <Card key={k} gridColumns="30% 70%" css={css`height: 80px`}>
                            <CardMedia position="left" onClick={() => navigate(`/detail?id=${v.animeId}`)}>
                                <LazyImage src={v.coverImage} />
                            </CardMedia>
                            <CardContent css={css`
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                flex-direction: row;
                            `}>
                                {v.animeTitle}
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleData(v)} />
                            </CardContent>
                        </Card>
                    )
                }) :
                    <div>There is no collection data</div>
                }   
                <ModalConfirmation 
                    content={`Delete ${selectedData?.animeTitle} from this collection?`}
                    showModal={showModalConfirm}
                    onClickConfirm={handleRemoveFromList}
                    handleOpenModal={handleModalConfirm}
                ></ModalConfirmation>
            </div>
        </>
    )
}