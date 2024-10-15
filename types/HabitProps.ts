interface HabitsProps {
    id: string;
    user_id: string;
    name: string;
    type: string;
    goal: string;
    duration: number;
    is_done_today: boolean;
    created_at: string;
}

export default HabitsProps;