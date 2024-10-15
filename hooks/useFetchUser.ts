import { useEffect, useState } from "react";
import UserProps from "../types/UserProps";
import { supabase } from "@/config/supabase";

const useFetchUser = (user_id: string | undefined) => {
    const [user, setUser] = useState<UserProps | null>(null);
  
    useEffect(() => {
      if (user_id && !user) {
        getUserData();
      }
    }, [user_id]);
  
    const getUserData = async () => {
      try {
        const { data, error, status } = await supabase
          .from('users')
          .select()
          .eq('id', user_id)
          .single();
  
        if (error && status !== 406) {
          throw error;
        }
  
        if (data) {
          setUser({ ...data });
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    };
  
    return user;
  };

export default useFetchUser;