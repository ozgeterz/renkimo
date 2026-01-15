import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ThankYou() {
  const navigate = useNavigate();
  const purchaseTracked = useRef(false);

  useEffect(() => {
    if (!purchaseTracked.current && typeof window.fbq === "function") {
      window.fbq("track", "Purchase");
      purchaseTracked.current = true;
    }
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate("/");
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6 animate-bounce">🧸</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Siparişiniz Alındı! 🎉
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Uyku Arkadaşı Ayıcık siparişiniz başarıyla oluşturuldu.
        </p>
        <p className="text-gray-600 mb-6">
          En kısa sürede sizinle iletişime geçeceğiz. Çocuğunuz çok mutlu
          olacak! 🌙
        </p>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <p className="text-sm text-gray-600">
            🚀 Siparişiniz aynı gün kargoya verilecektir!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
