interface UserProps {
    id: string;
    email: string;
    username: string;
    full_name: string;
    coins: number;
    streak: number;
    streak_freeze: number;
    last_done_at: string | null;
    created_at: string;
    updated_at: string;
}

export default UserProps;