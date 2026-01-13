import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { citiesAndDistricts } from "../data/citiesAndDistricts";
import tuval1 from "../assets/tuval1.webp";
import tuval2 from "../assets/tuval2.webp";
import tuval3 from "../assets/tuval3.webp";
const cities = Object.keys(citiesAndDistricts);

const products = [
  { quantity: 1, price: 499, shipping: 50, freeShipping: false },
  { quantity: 2, price: 799, shipping: 0, freeShipping: true },
  { quantity: 3, price: 1000, shipping: 0, freeShipping: true },
];

function ProductPage() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    district: "",
    address: "",
    canvasQuantity: "1",
    paymentMethod: "cash",
  });
  const [districts, setDistricts] = useState([]);
  const productImages = [tuval1, tuval2, tuval3];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const formatPhoneNumber = (value) => {
    let cleaned = value.replace(/\D/g, "");

    if (cleaned.startsWith("90")) {
      cleaned = cleaned.slice(2);
    }

    if (cleaned.startsWith("0")) {
      cleaned = cleaned.slice(1);
    }

    if (cleaned.length === 0) {
      return "+90 ";
    } else if (cleaned.length <= 3) {
      return `+90 ${cleaned}`;
    } else if (cleaned.length <= 6) {
      return `+90 ${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else if (cleaned.length <= 8) {
      return `+90 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(
        6
      )}`;
    } else {
      return `+90 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(
        6,
        8
      )} ${cleaned.slice(8, 10)}`;
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "city") {
      setFormData((prev) => ({ ...prev, [name]: value, district: "" }));
      setDistricts(citiesAndDistricts[value] || []);
    } else if (name === "phone") {
      const formatted = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formId = import.meta.env.VITE_GOOGLE_FORM_ID_TUVAL;
    if (!formId) return;
    console.log(formId);
    const baseUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

    const canvasQuantityText =
      formData.canvasQuantity === "1"
        ? "1 ADET  TUVAL"
        : formData.canvasQuantity === "2"
        ? "2 ADET TUVAL"
        : "3 ADET TUVAL";

    const paymentMethodText =
      formData.paymentMethod === "cash" ? "Kapıda Nakit" : "Kapıda Kart";

    const body = new URLSearchParams({
      "entry.2043686489": formData.fullName,
      "entry.2028768623": formData.phone,
      "entry.771023585": formData.city,
      "entry.1526543336": formData.district,
      "entry.1955750203": formData.address,
      "entry.1839909422": canvasQuantityText,
      "entry.457560409": paymentMethodText,
    });

    fetch(baseUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body,
    }).catch((err) => {
      console.error("Google Forms gönderim hatası:", err);
    });
    navigate("/tesekkurler");
  };

  const selectedProduct = products.find(
    (p) => p.quantity === parseInt(formData.canvasQuantity)
  );
  const total = selectedProduct
    ? selectedProduct.price + selectedProduct.shipping
    : 0;
  const handlePageClick = () => {
    if (formRef.current) {
      const elementPosition = formRef.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - window.innerHeight / 2 + 270;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 w-full max-w-[390px] mx-auto">
      <div className="max-w-md ">
        <div className="bg-white shadow-xl">
          <div className="p-6 pb-0">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-center py-2 px-4 rounded-full mb-4 animate-pulse">
              <p className="text-sm font-bold">
                ⚡ ÖZEL KAMPANYA - SINIRLI STOK! ⚡
              </p>
            </div>
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
              🎨 Renkimo Tuval
            </h1>
            <p className="text-center text-gray-700 font-semibold mb-2">
              Çocuğunuzun İlk Sanat Eseri İçin
            </p>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="text-sm text-gray-600 font-semibold">
                (500+ Mutlu Aile)
              </span>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white text-center py-2 px-4 rounded-lg mb-4 shadow-md">
              <p className="text-sm font-bold">
                🎨 HER SİPARİŞE 6 RENK BOYA HEDİYE! 🎁
              </p>
            </div>
          </div>

          <div className="w-full leading-[0]" onClick={handlePageClick}>
            {productImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Tuval Görsel ${index + 1}`}
                className="w-full block h-auto"
              />
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 mt-0 border-t-4 border-purple-400">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl p-4 mb-4 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl">🎨</span>
                <h3 className="font-bold text-lg">HEDİYE: 6 RENK BOYA SETİ!</h3>
                <span className="text-3xl">🎨</span>
              </div>
              <div className="flex justify-center gap-2 mb-2">
                <span className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-md"></span>
                <span className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-md"></span>
                <span className="w-6 h-6 bg-yellow-300 rounded-full border-2 border-white shadow-md"></span>
                <span className="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-md"></span>
                <span className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white shadow-md"></span>
                <span className="w-6 h-6 bg-orange-500 rounded-full border-2 border-white shadow-md"></span>
              </div>
              <p className="text-center text-sm font-semibold">
                Her tuval siparişinizle birlikte 6 renkli boya seti HEDİYE!
              </p>
            </div>

            <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
              <span className="text-2xl">✨</span> Neden Renkimo?
            </h3>
            <ul className="text-sm text-gray-700 space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span>
                  <strong>Çocuklar için ideal boyut</strong> - Küçük ellere özel
                  tasarım
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span>
                  <strong>Premium kalite tuval</strong> - Profesyonel
                  sanatçıların tercihi
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span>
                  <strong>6 renkli boya seti hediye</strong> - Hemen çizmeye
                  başlasın!
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span>
                  <strong>Tüm boya türleri</strong> - Sulu, akrilik, yağlı boya
                  uyumlu
                </span>
              </li>
            </ul>
            <div className="mt-4 bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-300 rounded-lg p-4 shadow-md">
              <p className="text-sm text-gray-800 font-bold text-center mb-2">
                🎁 Çocuğunuza en güzel hediye!
              </p>
              <p className="text-xs text-gray-700 text-center">
                Hayal gücünü geliştirin, yaratıcılığını destekleyin, mutluluğunu
                izleyin! 🌈
              </p>
            </div>
          </div>
        </div>

        <div
          ref={formRef}
          className="bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 rounded-b-2xl shadow-xl p-6 border-t-4 border-purple-500"
        >
          <div className="bg-white rounded-xl p-4 mb-6 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              🎉 Hemen Sipariş Ver!
            </h2>
            <p className="text-sm text-gray-600 text-center">
              Çocuğunuzun yüzündeki mutluluğu görmek sadece birkaç adım uzakta
            </p>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                🔒 Güvenli
              </span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                📦 Hızlı Kargo
              </span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
                💯 Garantili
              </span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad Soyad
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Adınız ve Soyadınız"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Telefon
              </label>
              <div className="flex items-center w-full border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-purple-400">
                <span className="bg-gray-100 px-4 py-3 text-gray-600 font-medium select-none">
                  +90
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone.replace("+90 ", "")}
                  onChange={handleChange}
                  required
                  className="flex-1 px-2 py-3 text-gray-800 focus:outline-none"
                  placeholder="5XX XXX XX XX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İl
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none bg-white appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                <option value="">İl Seçiniz</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İlçe
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                disabled={!formData.city}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none bg-white appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                <option value="">İlçe Seçiniz</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adres
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                placeholder="Açık adresiniz"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adet Seçimi <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {products.map((product, index) => (
                  <label
                    key={product.quantity}
                    className={`cursor-pointer border-2 rounded-lg p-4 flex items-center justify-between transition relative ${
                      formData.canvasQuantity === product.quantity.toString()
                        ? "border-purple-500 bg-purple-50 shadow-lg"
                        : "border-gray-300 hover:border-purple-300 hover:shadow-md"
                    }`}
                  >
                    {index === 1 && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        🔥 EN ÇOK TERCİH EDİLEN
                      </div>
                    )}
                    {index === 2 && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        💰 EN AVANTAJLI
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="canvasQuantity"
                        value={product.quantity.toString()}
                        checked={
                          formData.canvasQuantity ===
                          product.quantity.toString()
                        }
                        onChange={handleChange}
                        className="w-5 h-5 text-purple-500"
                      />
                      <div>
                        <div className="font-bold text-gray-800 text-lg">
                          {product.quantity} Adet TUVAL
                        </div>
                        <div className="text-purple-600 font-bold text-xl">
                          {product.price} TL
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {product.freeShipping ? (
                        <span className="text-green-600 font-bold text-sm bg-green-100 px-3 py-2 rounded-lg border-2 border-green-300 animate-pulse">
                          🎁 ÜCRETSİZ KARGO
                        </span>
                      ) : (
                        <span className="text-gray-600 font-semibold text-sm">
                          + {product.shipping} TL kargo
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ödeme Yöntemi
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`cursor-pointer border-2 rounded-lg p-4 text-center transition ${
                    formData.paymentMethod === "cash"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-300 hover:border-purple-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className="text-2xl mb-1">💵</div>
                  <div className="text-sm font-semibold">Kapıda Nakit</div>
                </label>
                <label
                  className={`cursor-pointer border-2 rounded-lg p-4 text-center transition ${
                    formData.paymentMethod === "card"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-300 hover:border-purple-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className="text-2xl mb-1">💳</div>
                  <div className="text-sm font-semibold">Kapıda Kart</div>
                </label>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Tuval ({formData.canvasQuantity} adet)
                </span>
                <span className="font-semibold">
                  {selectedProduct?.price} TL
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Kargo</span>
                <span className="font-semibold text-green-600">
                  {selectedProduct?.shipping === 0
                    ? "ÜCRETSİZ"
                    : `${selectedProduct?.shipping} TL`}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-bold text-lg">Toplam</span>
                <span className="font-bold text-2xl text-purple-600">
                  {total} TL
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 px-6 rounded-xl text-xl shadow-2xl transform transition hover:scale-105 active:scale-95 animate-pulse"
            >
              🎉 SİPARİŞİ TAMAMLA 🎨
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
