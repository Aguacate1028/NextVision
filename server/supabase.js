import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ ERROR: Faltan variables de entorno");
  process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function testConnection() {
  try {
    // Probamos con la tabla 'usuario' que creamos arriba
    const { data, error } = await supabase.from("usuario").select("id_usuario").limit(1);
    if (error) throw error;
    console.log("✅ Conectado a Supabase y Base de Datos lista");
    return true;
  } catch (error) {
    console.error("❌ Error de comunicación con la DB:", error.message);
    return false;
  }
}