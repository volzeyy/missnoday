import { useEffect, useState } from "react";
import { supabase } from "@/config/supabase";

const useFetchSource = (cosmetic_id: string | null) => {
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    if (cosmetic_id) {
      getCosmeticData();
    }
  }, [cosmetic_id]);

  const getCosmeticData = async () => {
    try {
      const { data, error, status } = await supabase
        .from("cosmetics")
        .select()
        .eq("id", cosmetic_id)
        .single();

      if (error && status !== 406) {
        throw error.message;
      }

      if (data && data.src) {
        const { data: sourceData } = supabase.storage
          .from("cosmetics")
          .getPublicUrl(data.src);

        setSource(sourceData.publicUrl);
      }
    } catch (error) {
      alert(error);
    }
  };

  return source;
};

export default useFetchSource;
