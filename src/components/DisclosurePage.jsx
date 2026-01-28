import { Link } from "react-router-dom";
import Footer from "./Footer";

function DisclosurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 flex flex-col">
      <div className="flex-1 w-full max-w-[390px] mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-purple-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Aydınlatma Metni
          </h1>

          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              Bu aydınlatma metni; sipariş, teslimat ve müşteri iletişimi
              süreçlerinde toplanan kişisel verilerin hangi amaçlarla işlendiği,
              hangi hukuki sebeplere dayandığı ve hangi yöntemlerle toplandığı
              hakkında bilgilendirme sağlar.
            </p>

            <p>
              Toplanan veriler; siparişin hazırlanması ve teslim edilmesi,
              gerektiğinde sizinle iletişime geçilmesi, talep/şikâyet yönetimi
              ve ilgili yasal yükümlülüklerin yerine getirilmesi amaçlarıyla
              işlenebilir.
            </p>

            <p>
              Verileriniz, amaçla sınırlı ve ölçülü şekilde işlenir; güvenli
              şekilde saklanır ve yalnızca zorunlu durumlarda hizmet alınan
              tedarikçilerle paylaşılabilir.
            </p>

            <p>
              Detaylı bilgi ve talepleriniz için bizimle iletişime
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

export default DisclosurePage;
