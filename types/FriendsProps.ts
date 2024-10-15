export default interface FriendsProps {
    id: string;
    user_id: string;
    received_requests: string[] | null;
    sent_requests: string[] | null;
    friends_list: string[] | null;
}