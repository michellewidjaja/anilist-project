import { LazyLoadImage } from 'react-lazy-load-image-component';
import blankImage from '../../assets/blank_image.png';

export default function LazyImage(props: any) {
    return (
        <>
            <LazyLoadImage 
                width={'100%'}
                height={'100%'}
                alt={blankImage}
                {...props} 
            />
        </>
    )
}