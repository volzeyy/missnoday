interface CosmeticProps {
    id: string;
    user_id: string;
    hat_id: string | null;
    hair_id: string | null;
    face_id: string | null;
    shirt_id: string | null;
    pants_id: string | null;
    background_id: string | null;
    created_at: string;
    updated_at: string;
}

export default CosmeticProps;