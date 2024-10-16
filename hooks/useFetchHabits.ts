import { useEffect, useState } from "react";
import HabitProps from "@/types/HabitProps";
import { supabase } from "@/config/supabase";

const useFetchHabits = (user_id: string | undefined) => {
    const [habits, setHabits] = useState<HabitProps[] | null>(null);
  
    useEffect(() => {
      if (user_id && !habits) {
        getHabitsData();
      }
    }, [user_id]);
  
    const getHabitsData = async () => {
      try {
        const { data, error, status } = await supabase
          .from('habits')
          .select()
          .eq('user_id', user_id)
  
        if (error && status !== 406) {
          throw error;
        }
  
        if (data) {
          setHabits(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    };
  
    return habits;
  };

export default useFetchHabits;