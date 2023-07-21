import React, { useState } from 'react';
import { Card, CardContent, 
    PageTitle, Modal, 
    ModalContent, Button, Message } from '../../pages/globalStyles';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


import Input from '../Input';

interface Props {
    action?: "add" | "edit"
}

interface Message {
    type?: string | "error",
    message: string
}

export default function AddEditCollection(props: Props) {
    const { action } = props;
    const navigate = useNavigate();
    const getCollectionList = localStorage.getItem('collectionList') || '';
    const parsedList = getCollectionList ? JSON.parse(getCollectionList) : {};

    const [openModal, setOpenModal] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [message, setMessage] = useState<Message>({ message: '' });
    const isEdit = action === 'edit';

    const handleOpenModal = () => {
        setCollectionName('');
        setMessage({ message: ''});
        setOpenModal(!openModal);
    }

    const checkCollectionNameExist = () => {
        const existingName = Object.keys(parsedList) || [];
        
        const checkExist = existingName.includes(collectionName);
        
        return checkExist;
    }

    const handleSaveCollection = () => {
        setMessage({ message: ''});

        if (collectionName === '') {
            setMessage({ message: 'Please fill in the collection name', type: 'error'});
            return false;
        }

        console.log(checkCollectionNameExist());

        const collection = {
            ...parsedList,
            [collectionName] : []
        }

        if (checkCollectionNameExist()) {
            setMessage({ message: `Duplicate name ${collectionName}`, type: 'error'})
        } else {
            localStorage.setItem('collectionList', JSON.stringify(collection));
            setMessage({ message: `Succesfully added to ${collectionName} collection` });
            navigate('/collection');
        }
        setCollectionName('');
    }

    return (
        <>  
            {
                isEdit ? (
                    <FontAwesomeIcon icon={faPen} onClick={() => setOpenModal(true)} />
                ) : (
                    <Button variant="invert" onClick={() => setOpenModal(true)}
                        css={css`
                            width: 200px;
                        `}
                    > 
                        <FontAwesomeIcon icon={faPlus} />
                        Add Collection
                    </Button>
                )
            }
            <Modal show={openModal}>
                <ModalContent>
                    <div css={css`text-align: right`}>
                        <FontAwesomeIcon icon={faXmark} onClick={handleOpenModal}/>
                    </div>
                    <PageTitle>{isEdit ? 'Edit' : 'Add'} Collection</PageTitle>
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
                </ModalContent>
            </Modal>
        </>
    )
}