interface CosmeticProps {
    [key: string]: {
        id: string, 
        type: string, 
        name: string, 
        src: string,
        thumbnail?: string,
    };
}

export default CosmeticProps;