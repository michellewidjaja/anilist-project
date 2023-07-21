import React, { useState } from 'react';
import { Card, CardContent, 
    PageTitle, ListItem, Item, Modal, 
    ModalContent, Button, Message, Subtitle } from '../../pages/globalStyles';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

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
        }

        const newItem = [
            ...(parsedList[collectionName] ? parsedList[collectionName] : []),
            {
                collectionName: collectionName,
                animeId: detail.id,
                animeTitle: detail.title.romaji,
                coverImage: detail.coverImage.medium
            }
        ]

        const collection = {
            ...parsedList,
            [collectionName] : newItem
        }

        if (checkIfExistInCollection()) {
            setMessage({ message: `Duplicate name ${collectionName}`, type: 'error'})
        } else {
            localStorage.setItem('collectionList', JSON.stringify(collection));
            setMessage({ message: `Succesfully added to ${collectionName} collection` });
            handleOpenModal();
        }
        setCollectionName('');
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
                            { message && <Message type={message.type}>{message.message}</Message> }
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