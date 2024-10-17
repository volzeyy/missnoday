import { useEffect, useState } from "react";
import ColorsProps from "@/types/ColorsProps";
import { supabase } from "@/config/supabase";

const useFetchColors = (user_id: string | undefined) => {
    const [colors, setColors] = useState<ColorsProps | null>(null);
  
    useEffect(() => {
      if (user_id && !colors) {
        getColorsData();
      }
    }, [user_id]);
  
    const getColorsData = async () => {
      try {
        const { data, error, status } = await supabase
          .from('colors')
          .select()
          .eq('user_id', user_id)
          .single();
  
        if (error && status !== 406) {
          throw error;
        }
  
        if (data) {
          setColors({ ...data });
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    };
  
    return colors;
  };

export default useFetchColors;