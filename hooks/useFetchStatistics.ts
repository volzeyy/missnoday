import { useEffect, useState } from "react";
import UserProps from "../types/UserProps";
import { supabase } from "@/config/supabase";
import StatisticsProps from "@/types/StatisticsProps";

const useFetchStatistics = (user_id: string | undefined) => {
    const [statistics, setStatistics] = useState<StatisticsProps | null>(null);
  
    useEffect(() => {
      if (user_id && !statistics) {
        getStatisticsData();
      }
    }, [user_id]);
  
    const getStatisticsData = async () => {
      try {
        const { data, error, status } = await supabase
          .from('statistics')
          .select()
          .eq('user_id', user_id)
          .single();
  
        if (error && status !== 406) {
          throw error;
        }
  
        if (data) {
          setStatistics({ ...data });
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    };
  
    return statistics;
  };

export default useFetchStatistics;