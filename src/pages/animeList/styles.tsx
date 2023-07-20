import styled from '@emotion/styled';

export const AnimeListContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 100%;
    justify-content: center;

    @media (min-width: 1200px) {
        grid-gap: 20px;
        grid-template-columns: repeat(3, 1fr);
    }
`;