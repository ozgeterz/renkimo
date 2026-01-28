import { Link } from "react-router-dom";
import Footer from "./Footer";

function KvkkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 flex flex-col">
      <div className="flex-1 w-full max-w-[390px] mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-purple-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">KVKK</h1>

          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              İşbu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)
              kapsamında, kişisel verilerinizin işlenmesine ilişkin temel
              bilgilendirmeyi içerir.
            </p>

            <p>
              Sipariş oluşturma sürecinde ad-soyad, telefon numarası, il/ilçe ve
              adres gibi bilgileriniz; siparişin alınması, teslimatın
              sağlanması, müşteri iletişimi ve yasal yükümlülüklerin
              yerine getirilmesi amaçlarıyla işlenebilir.
            </p>

            <p>
              Kişisel verileriniz, ilgili mevzuatta öngörülen süreler boyunca
              saklanır ve yalnızca belirtilen amaçlar doğrultusunda üçüncü
              kişilerle paylaşılabilir (ör. kargo/lojistik hizmetleri).
            </p>

            <p>
              KVKK kapsamındaki haklarınızı kullanmak için bizimle iletişime
              geçebilirsiniz.
            </p>
          </div>

          <div className="mt-6">
            <Link
              to="/"
              className="inline-block text-purple-700 font-semibold hover:text-purple-900 transition-colors"
            >
              Ana sayfaya dön
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default KvkkPage;
