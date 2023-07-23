import styled from '@emotion/styled';

export const Layout = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 80px 25px 50px 25px;
    background-color: #f5f8f9;
`;

export const BadgeContainer = styled.div`
    display: grid;
    grid-gap: 4px;
    grid-template-columns: repeat(auto-fill, minmax(50px, auto));
    margin: 5px 0;
`;

export const Badge = styled.span`
    color: #fff;
    border-radius: 8px;
    background-color: #1ab0b3;
    text-align: center;
    font-size: 12px;    
    line-height: 16px;
    padding: 1px;
`;

type CardProps = {
    gridColumns?: string,
    variant?: string
}

export const Card = styled.div<CardProps>`
    width: 100%;
    border-radius: 8px;
    box-shadow: 0px 2px 8px -1px #aeb2be;
    background-color: #fff;
    display: grid;
    grid-template-columns: ${props => props.gridColumns ? props.gridColumns : '100%' };
    margin: 10px 0;

    ${props => props.variant === 'gray' && `
            box-shadow: none;
            background-color: #f5f8f9;
        `
    }
`;

export const CardTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 5px;
`;

export const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
`;

type CardMediaProps = {
    position?: 'top' | 'left',
}

export const CardMedia = styled.div<CardMediaProps>`
    height: 100%;
    border-radius: ${props => props.position === 'left' ? '8px 0px 0 8px' : '8px'};
    overflow: hidden;
    background: #f3f3f3;

    img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
`;

type ButtonProps = {
    variant?: string
};

export const Button = styled.div<ButtonProps>`
    border-radius: 4px;
    background-color: #1ab0b3;
    color: #fff;
    padding: 8px 15px;
    font-weight: 600;
    font-size: 16px;
    word-spacing: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;

    &:hover {
        background-color: #117476;
    }

    ${props => props.variant === 'invert' && `
        background-color: #fff;
        color: #1ab0b3;
        border: 1px solid #1ab0b3;

        &:hover {
            background-color: #1ab0b3;
            color: #fff;
        }
    `}
`;

export const LineClamp = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const PageTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin: 5px 0 20px;
`;

export const Subtitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin: 5px 0 10px;
`;

export const Link = styled.div`
    font-size: 14px;
    color: #1ab0b3;
    margin: 5px 0;

    svg {
        margin: 0 5px;
    }

    &:hover {
        color: #117476;
    }
`;

export const ListItem = styled.ul`
    list-style-type: none;
    margin: 10px 0;
    font-weight: normal;
    font-size: 16px;
`;

export const Item = styled.li`
    padding: 10px;
    border-bottom: 1px solid #d0d5e2;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

type ModalProps = {
    show: boolean
}

export const Modal = styled.div<ModalProps>`
    display: none; 
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);

    ${props => props.show && `
        display: block
    `}
`;

export const ModalContent = styled.div`
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%; 
    border-radius: 8px;
`;

export const InputWrapper = styled.div`
    input {
        width: 100%;
        height: 38px;
        padding: 20px;
        margin-bottom: 10px;
    }
`;

type MessageProps = {
    type?: string
}

export const Message = styled.div<MessageProps>`
    color: #27ae60;
    font-size: 14px;
    margin: 5px 0;
    font-weight: normal;

    ${props => props.type === 'error' && `
        color: #e84118;
    `}
`

export const Label = styled.div`
    font-size: 14px;
    margin-bottom: 5px;
`;