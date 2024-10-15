import { useEffect, useState } from "react";
import { supabase } from "@/config/supabase";
import useSessionStore from "@/stores/useSessionStore";

const useFetchRandomUsers = () => {
  const [randomUsers, setRandomUsers] = useState<any | null>(null);

  const { session } = useSessionStore((state) => state); 

  useEffect(() => {
    fetchRandomUsers()
  }, [])

  const fetchRandomUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .limit(10)

      if (error) {
        throw error
      }

      if (data) {
        const filteredData = data.filter(user => user.id !== session?.user.id);
        setRandomUsers(filteredData)
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error in fetchRandomUsers: ${error.message}`)
      }
    }
  }

  return randomUsers;
}

export default useFetchRandomUsers;