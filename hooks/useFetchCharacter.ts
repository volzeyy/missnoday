import { useEffect, useState } from "react";
import CharacterProps from "@/types/CharacterProps";
import { supabase } from "@/config/supabase";

const useFetchCharacter = (user_id: string | undefined) => {
    const [character, setCharacter] = useState<CharacterProps | null>(null);
  
    useEffect(() => {
      if (user_id && !character) {
        getCharacterData();
      }
    }, [user_id]);
  
    const getCharacterData = async () => {
      try {
        const { data, error, status } = await supabase
          .from('characters')
          .select()
          .eq('user_id', user_id)
          .single();
  
        if (error && status !== 406) {
          throw error;
        }
  
        if (data) {
          setCharacter({ ...data });
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    };
  
    return character;
  };

export default useFetchCharacter;