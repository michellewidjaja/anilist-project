import React from 'react';
import { TopHeader } from './styles';
import { Button } from '../../pages/globalStyles';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const navigate = useNavigate();

    return (
        <TopHeader>
            <div onClick={() => navigate('/')}>AniList</div>
            <Button variant="invert" onClick={() => { navigate('collection') }}>
                <FontAwesomeIcon icon={faBookmark} />
                My Collection
            </Button>
        </TopHeader>
    )
}