import { useEffect, useState } from "react"
import FriendsProps from "@/types/FriendsProps"
import { supabase } from "@/config/supabase"

const useFetchFriends = (user_id: string | undefined) => {
    const [friends, setFriends] = useState<FriendsProps | null>(null)
    
    useEffect(() => {
      if (user_id && !friends) {
        getUserFriends()
      }
    }, [user_id])
  
    const getUserFriends = async () => {
      try {
        if (!user_id) throw new Error('No user_id!')
  
        const { data, error, status } = await supabase
          .from('friends')
          .select()
          .eq('user_id', user_id)
          .single()
  
        if (error && status !== 406) {
          throw error.message
        }
  
        if (data) {
          setFriends({ ...data })
        }
      } catch (error) {
        alert(error)
      }
    }
  
    return friends;
}

export default useFetchFriends;