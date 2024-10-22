import { useEffect, useState } from "react";
import CosmeticProps from "@/types/CosmeticProps";
import { supabase } from "@/config/supabase";

const useFetchCosmetic = (cosmetic_id: string | undefined) => {
    const [cosmetic, setCosmetic] = useState<CosmeticProps | null>(null);
  
    useEffect(() => {
      if (cosmetic_id) {
        getCosmeticData();
      }
    }, [cosmetic_id]);
  
    const getCosmeticData = async () => {
      try {
        const { data, error, status } = await supabase
          .from('cosmetics')
          .select()
          .eq('id', cosmetic_id)
          .single();
  
        if (error && status !== 406) {
          throw error;
        }
  
        if (data) {
          setCosmetic({ ...data });
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    };
  
    return cosmetic;
  };

export default useFetchCosmetic;