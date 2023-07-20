import React, { useState } from 'react';
import { Card, CardContent, 
    PageTitle, Link, ListItem, Item, Modal, 
    ModalContent, Button, ErrorMessage, Subtitle } from '../../pages/globalStyles';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

import Input from '../Input';

interface CollectionListItem {
    collectionName: string,
    description: string,
    animeId: string,
    animeTitle: string
}

interface CollectionList {
    [key: string]: CollectionListItem[]
}

interface Props {
    detail: {
        [key: string]: any
    }
}

export default function AddCollection(props: Props) {
    const { detail } = props;
    const getCollectionList = localStorage.getItem('collectionList') || '';
    const parsedList = getCollectionList ? JSON.parse(getCollectionList) : {};

    const [openModal, setOpenModal] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [collectionList, setCollectionList] = useState<CollectionList>(parsedList);
    const [errorMsg, setErrorMsg] = useState('');

    const handleOpenModal = () => {
        setOpenModal(!openModal);
    }

    const checkIfExistInCollection = () => {
        const existingList = parsedList[collectionName] ? parsedList[collectionName] : [];

        existingList.forEach((v: CollectionListItem, k: string) => { 
            if(v?.animeTitle === detail.title.romaji) {
                setErrorMsg(`Duplicate name ${collectionName}`)
                return false;
            }
        });
    }

    const handleSaveCollection = () => {
        setErrorMsg('');

        if (collectionName === '') {
            setErrorMsg('Please fill in the collection name');
            return false;
        }

        const newItem = [
            ...(parsedList[collectionName] ? parsedList[collectionName] : []),
            {
                collectionName: collectionName,
                animeId: detail.id,
                animeTitle: detail.title.romaji
            }
        ]

        checkIfExistInCollection();
        
        const collection = {
            ...parsedList,
            [collectionName] : newItem
        }

        setCollectionList(collection)
        localStorage.setItem('collectionList', JSON.stringify(collection))
    }

    return (
        <>  
            <Button variant="invert" onClick={() => setOpenModal(true)}
                css={css`
                    width: 200px;
                `}
            > 
                <FontAwesomeIcon icon={faPlus} />
                Add to Collection
            </Button>
            <Modal show={openModal}>
                <ModalContent>
                    <div css={css`text-align: right`}>
                        <FontAwesomeIcon icon={faXmark} onClick={handleOpenModal}/>
                    </div>
                    <PageTitle>Add Collection</PageTitle>
                    <Card variant="gray">
                        <CardContent>
                            <Input 
                                type="text"
                                placeholder="Collection Name"
                                label="Collection Name"
                                onChange={(e: { target: { value: string }; }) => setCollectionName(e.target.value)} value={collectionName}
                            />
                            { errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage> }
                        </CardContent>
                    </Card>
                    
                    <Button onClick={handleSaveCollection}>Save</Button>
                    <hr css={css`margin: 20px 0`} />
                    <Subtitle css={css`margin-top: 20px;`}>My Collection</Subtitle>
                    <ListItem>
                        {Object.keys(parsedList)?.map((k3: string) => {
                            return (
                                <Item key={k3} onClick={() => setCollectionName(k3)}>
                                    {k3}
                                    <FontAwesomeIcon icon={faPlus} />
                                </Item>
                            )
                        })}
                    </ListItem>
                </ModalContent>
            </Modal>
        </>
    )
}