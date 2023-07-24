import React, { useState } from 'react';
import { Card, CardContent, 
    PageTitle, ListItem, Item, Modal, 
    ModalContent, Button, Message, Subtitle } from '../../pages/globalStyles';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';

import Input from '../Input';

interface CollectionListItem {
    collectionName: string,
    description: string,
    animeId: string,
    animeTitle: string,
    coverImage?: string    
}

interface Props {
    detail: {
        [key: string]: any
    }
}

interface Message {
    type?: string,
    message: string
}

export default function AddToCollection(props: Props) {
    const { detail } = props;
    const getCollectionList = localStorage.getItem('collectionList') || '';
    const parsedList = getCollectionList ? JSON.parse(getCollectionList) : {};

    const [openModal, setOpenModal] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [message, setMessage] = useState<Message>({ message: '' });

    const handleOpenModal = () => {
        setCollectionName('');
        setMessage({ message: ''});
        setOpenModal(!openModal);
    }

    const checkIfExistInCollection = () => {
        const existingList = parsedList[collectionName] ? parsedList[collectionName] : [];
        const checkExist = existingList.find((v: CollectionListItem, k: string) => v?.animeTitle === detail.title.romaji);
        
        return checkExist?.animeTitle ? true : false;
    }

    const handleSaveCollection = () => {
        setMessage({ message: ''});

        if (collectionName === '') {
            setMessage({ message: 'Please fill in the collection name', type: 'error'});
            return false;
        } else if (/[^a-zA-Z0-9]/.test(collectionName)) {
            setMessage({ message: 'Field cannot contain special characters', type: 'error'});
            return false;
        }

        const newItem = [
            ...(parsedList[collectionName] ? parsedList[collectionName] : []),
            {
                collectionName: collectionName,
                animeId: detail.id,
                animeTitle: detail.title.romaji,
                coverImage: detail.coverImage.large
            }
        ]

        const collection = {
            ...parsedList,
            [collectionName] : newItem
        }

        if (checkIfExistInCollection()) {
            setMessage({ message: `Duplicate anime in the collection - ${collectionName}`, type: 'error'})
        } else {
            localStorage.setItem('collectionList', JSON.stringify(collection));
            setMessage({ message: `Succesfully added to ${collectionName} collection` });
        }
        setCollectionName('');
    }

    return (
        <>  
            <FontAwesomeIcon icon={faHeartCirclePlus} 
                data-testid="btnAddToCollection" 
                onClick={() => setOpenModal(true)}
                css={css`
                    color: #e95b5b;
                    font-size: 20px;
                `} 
            />
            <Modal show={openModal} data-testid="modalAddCollection">
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
                                onChange={(e: { target: { value: string }; }) => setCollectionName(e.target.value)} 
                                value={collectionName}
                                data-testid="inputCollection"
                            />
                            { message && <Message type={message.type}>{message.message}</Message> }
                        </CardContent>
                    </Card>
                    
                    <Button onClick={handleSaveCollection} data-testid="btnSaveToCollection">Save</Button>
                    <hr css={css`margin: 20px 0`} />
                    <Subtitle css={css`margin-top: 20px;`}>My Collection</Subtitle>
                    <ListItem>
                        {
                        Object.keys(parsedList).length > 0 ?
                        Object.keys(parsedList)?.map((k3: string) => {
                            return (
                                <Item key={k3} onClick={() => setCollectionName(k3)} data-testid={k3}>
                                    {k3}
                                    <FontAwesomeIcon icon={faPlus} />
                                </Item>
                            )
                        }) : 
                            <Item>There is no collection data</Item>
                        }
                    </ListItem>
                </ModalContent>
            </Modal>
        </>
    )
}