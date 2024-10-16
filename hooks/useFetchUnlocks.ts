import { useEffect, useState } from "react";
import { supabase } from "@/config/supabase";
import UnlocksProps from "@/types/UnlocksProps";

const useFetchUnlocks = (user_id: string | undefined) => {
    const [unlocks, setUnlocks] = useState<UnlocksProps[] | null>(null);
  
    useEffect(() => {
      if (user_id && !unlocks) {
        getUserData();
      }
    }, [user_id]);
  
    const getUserData = async () => {
      try {
        const { data, error, status } = await supabase
          .from('unlocks')
          .select()
          .eq('user_id', user_id)
  
        if (error && status !== 406) {
          throw error;
        }
  
        if (data) {
          setUnlocks(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    };
  
    return unlocks;
  };

export default useFetchUnlocks;