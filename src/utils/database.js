import { supabase } from "./supabase";

export const saveOrder = async (orderData) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          full_name: orderData.fullName,
          phone: orderData.phone,
          city: orderData.city,
          district: orderData.district,
          address: orderData.address,
          selected_products: orderData.selectedProducts,
          payment_method: orderData.paymentMethod,
          total_price: orderData.totalPrice,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase kayıt hatası:", error);
      return { success: false, error };
    }

    console.log("Sipariş başarıyla kaydedildi:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Database kayıt hatası:", err);
    return { success: false, error: err };
  }
};
