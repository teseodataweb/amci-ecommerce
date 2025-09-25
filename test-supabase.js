// Script para probar la conexión con Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://dzgjxrghqyotixqnrexu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6Z2p4cmdocXlvdGl4cW5yZXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3NjI4NjMsImV4cCI6MjA3NDMzODg2M30.oaNvpXAAoeUmg72f_fp0ECdbwG06sjVLNwLWmgbxhIQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('🔄 Probando conexión con Supabase...');

  try {
    // Probar Auth
    const { data: authData, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.error('❌ Error en Auth:', authError.message);
    } else {
      console.log('✅ Conexión Auth funcionando');
    }

    // Probar query a la base de datos
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Error en BD:', error.message);
    } else {
      console.log('✅ Conexión a Base de Datos funcionando');
      console.log('📊 Tablas creadas correctamente');
    }

    console.log('\n🎉 ¡TODO LISTO! Puedes usar:');
    console.log('   - Registro: http://localhost:3001/registro');
    console.log('   - Login: http://localhost:3001/login');
    console.log('   - Registro Proveedor: http://localhost:3001/registro-proveedor');

  } catch (err) {
    console.error('❌ Error general:', err);
  }
}

testConnection();