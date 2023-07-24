import React from 'react';
import { Modal, ModalContent, Button, PageTitle } from '../../pages/globalStyles';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
    showModal: boolean,
    content: string,
    onClickConfirm: () => void,
    handleOpenModal: () => void
}

export default function ModalConfirmation(props: Props) {
    const { content, showModal, onClickConfirm, handleOpenModal } = props;

    return (
        <>
            <Modal show={showModal}>
                <ModalContent>
                    <div css={css`text-align: right`}>
                        <FontAwesomeIcon icon={faXmark} onClick={handleOpenModal}/>
                    </div>
                    <PageTitle css={css`
                        font-size: 18px;
                        line-height: 20px;
                    `}>{content}</PageTitle>
                    <div css={css`
                        display: flex;
                        gap: 10px;
                        justify-content: center;
                    `}>
                        <Button variant="invert" fullWidth onClick={handleOpenModal}>No</Button>
                        <Button fullWidth onClick={onClickConfirm}>Confirm</Button>
                    </div>
                </ModalContent>
            </Modal>
        </>
    )
}