import { useEffect, useState } from "react";
import { supabase } from "@/config/supabase";
import useSessionStore from "@/stores/useSessionStore";

const useFetchMatchingUsers = (username: string) => {
    const [matchingUsers, setMatchingUsers] = useState<{ id: string}[] | null>(null);
    const { session } = useSessionStore((state) => state);
  
    useEffect(() => {
      setMatchingUsers(null);
  
      const timeout = setTimeout(async () => {
        if (username.length >= 3) {
          try {
            const sanitizedUsername = username.replace(/@/g, '').toLowerCase();

            const { data, error } = await supabase
              .from('users')
              .select('id')
              .like('username', `%${sanitizedUsername}%`)
              .limit(10)
  
            if (error) {
              throw error
            }
  
            if (data) {
              const filteredData = data.filter(user => user.id !== session?.user.id);
              setMatchingUsers(filteredData);
            }
          } catch (error) {
            if (error instanceof Error) {
              alert(`Error in fetchMatchingUsers: ${error.message}`)
            }
          }
        }
      }, 1000);
      
      return () => clearTimeout(timeout)
    }, [username])
  
    return matchingUsers;
  }

export default useFetchMatchingUsers;