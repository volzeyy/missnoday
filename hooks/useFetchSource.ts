import { useEffect, useState } from "react";
import CosmeticProps from "@/types/CosmeticProps";
import { supabase } from "@/config/supabase";

const useFetchSource = (cosmetic_id: string | null) => {
    const [source, setSource] = useState<string | null>(null);

    useEffect(() => {
      if (cosmetic_id && !source) {
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
            const { data: sourceData } = supabase
                .storage
                .from("cosmetics")
                .getPublicUrl(data.src)
            
            setSource(sourceData.publicUrl);
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    };
  
    return source;
  };

export default useFetchSource;