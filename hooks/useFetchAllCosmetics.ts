import { useEffect, useState } from "react";
import CosmeticProps from "@/types/CosmeticProps";
import { supabase } from "@/config/supabase";

const useFetchAllCosmetics = () => {
    const [allCosmetics, setAllCosmetics] = useState<CosmeticProps[] | null>(null);
  
    useEffect(() => {
      if (!allCosmetics) {
        getAllCosmeticsData();
      }
    }, []);
  
    const getAllCosmeticsData = async () => {
      try {
        const { data, error, status } = await supabase
          .from('cosmetics')
          .select()
  
        if (error && status !== 406) {
          throw error;
        }
  
        if (data) {
          setAllCosmetics(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    };
  
    return allCosmetics;
  };

export default useFetchAllCosmetics;