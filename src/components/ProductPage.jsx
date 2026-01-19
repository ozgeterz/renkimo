import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { citiesAndDistricts } from "../data/citiesAndDistricts";
import { saveOrder } from "../utils/database";
import st1 from "../assets/st1.webp";
import st2 from "../assets/st2.webp";
import st3 from "../assets/st3.webp";
import gm2 from "../assets/gm2.webp";
import gm3 from "../assets/gm3.webp";
import gm4 from "../assets/gm4.webp";
const cities = Object.keys(citiesAndDistricts);

const productVariants = [
  { id: "mavi-stitch", name: "Mavi Stitch", image: gm3 },
  // { id: "pembe-ayıcık", name: "Pembe Ayıcık", image: gm2 },
  { id: "pembe-stitch", name: "Pembe Stitch", image: gm4 },
];

const getTotalPrice = (productCount) => {
  if (productCount === 1) return 1499;
  if (productCount === 2) return 2599;
  if (productCount === 3) return 3499;
  if (productCount === 4) return 4499;
  if (productCount >= 5) return 4499 + (productCount - 4) * 1000;
  return 0;
};

const getOriginalTotalPrice = (productCount) => {
  return productCount * 1999; // Original price per product
};

function ProductPage() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const phoneInputRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    district: "",
    address: "",
    paymentMethod: "cash",
    selectedProducts: [],
  });
  const [productQuantities, setProductQuantities] = useState({});
  const [districts, setDistricts] = useState([]);
  const [phoneError, setPhoneError] = useState("");
  const productImages = [st1, st3, st2];

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
        6,
      )}`;
    } else {
      return `+90 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(
        6,
        8,
      )} ${cleaned.slice(8, 10)}`;
    }
  };
  const handleQuantityChange = (productId, delta) => {
    setProductQuantities((prev) => {
      const currentQty = prev[productId] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return { ...prev, [productId]: newQty };
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "city") {
      setFormData((prev) => ({ ...prev, [name]: value, district: "" }));
      setDistricts(citiesAndDistricts[value] || []);
    } else if (name === "phone") {
      const formatted = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, [name]: formatted }));
      setPhoneError("");
    } else if (name === "productVariant") {
      // This is now handled by quantity buttons
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, "").replace(/^90/, "");
    if (cleaned.length !== 10) {
      return "Telefon numarası 10 haneli olmalıdır";
    }
    if (!cleaned.startsWith("5")) {
      return "Telefon numarası 5 ile başlamalıdır";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Telefon validasyonu
    const phoneValidationError = validatePhone(formData.phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      phoneInputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      phoneInputRef.current?.focus();
      return;
    }

    // Ürün seçimi kontrolü
    const totalQuantity = Object.values(productQuantities).reduce(
      (sum, qty) => sum + qty,
      0,
    );
    if (totalQuantity === 0) {
      alert("⚠️ Lütfen en az bir ürün seçiniz!");
      return;
    }

    const formId = import.meta.env.VITE_GOOGLE_FORM_ID_AYI;
    if (!formId) return;
    console.log(formId);
    const baseUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

    const selectedProductNames = Object.entries(productQuantities)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const variant = productVariants.find((v) => v.id === id);
        return `${variant?.name} (${qty} adet)`;
      })
      .join(" + ");

    const paymentMethodText =
      formData.paymentMethod === "cash" ? "Kapıda Nakit" : "Kapıda Kart";

    const body = new URLSearchParams({
      "entry.2043686489": formData.fullName,
      "entry.2028768623": formData.phone,
      "entry.771023585": formData.city,
      "entry.1526543336": formData.district,
      "entry.1955750203": formData.address,
      "entry.1839909422": `${selectedProductNames}`,
      "entry.457560409": paymentMethodText,
    });

    // Google Forms'a gönder (mevcut yapı korunuyor)
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

    // Database'e kaydet (paralel olarak)
    const orderData = {
      fullName: formData.fullName,
      phone: formData.phone,
      city: formData.city,
      district: formData.district,
      address: formData.address,
      selectedProducts: Object.entries(productQuantities)
        .filter(([_, qty]) => qty > 0)
        .map(([id, qty]) => ({ id, quantity: qty })),
      paymentMethod: paymentMethodText,
      totalPrice: totalPrice,
    };

    await saveOrder(orderData);

    navigate("/tesekkurler");
  };

  const totalQuantity = Object.values(productQuantities).reduce(
    (sum, qty) => sum + qty,
    0,
  );
  const totalPrice = getTotalPrice(totalQuantity);
  const totalOriginalPrice = getOriginalTotalPrice(totalQuantity);
  const handlePageClick = () => {
    if (formRef.current) {
      const elementPosition = formRef.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - window.innerHeight / 2 + 290;

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
          <div
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 cursor-pointer"
            onClick={handlePageClick}
          >
            <div className="text-center">
              <p className="text-sm font-semibold mb-3">🎁 ÖZEL FİYATLAR 🎁</p>

              <div className="flex justify-center gap-2 mb-3">
                {productVariants.map((variant) => (
                  <img
                    key={variant.id}
                    src={variant.image}
                    alt={variant.name}
                    className="w-16 h-16 rounded-lg object-cover border-2 border-white/50 shadow-lg"
                  />
                ))}
              </div>

              <div className="flex justify-center items-center gap-2 flex-wrap">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-2">
                  <p className="text-xs opacity-90">1 Adet</p>
                  <p className="text-base font-bold">1.499 TL</p>
                </div>
                <div className="bg-white/30 backdrop-blur-sm rounded-lg px-2 py-2 border-2 border-yellow-300">
                  <p className="text-xs opacity-90">2 Adet</p>
                  <p className="text-base font-bold">2.599 TL</p>
                </div>
                <div className="bg-white/30 backdrop-blur-sm rounded-lg px-2 py-2 border-2 border-yellow-300">
                  <p className="text-xs opacity-90">3 Adet</p>
                  <p className="text-base font-bold">3.499 TL</p>
                </div>
              </div>
              <p className="text-xs mt-2 opacity-90">
                ✨ 4+ alımda her ek ürün sadece 1.000 TL!
              </p>
              <p className="text-xs mt-1 opacity-75">
                👆 Sipariş vermek için tıklayın
              </p>
            </div>
          </div>

          <div className="w-full leading-[0]" onClick={handlePageClick}>
            {productImages.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`Ayıcık Görsel ${index + 1}`}
                  className="w-full block h-auto"
                />
                {index === 0 && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-5 shadow-lg">
                    <p className="text-center font-extrabold text-lg">
                      Kapıda Ödeme
                    </p>
                    <p className="text-center text-sm opacity-95 mt-1">
                      Nakit veya Kart ile ödeme yapabilirsiniz.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 mt-0 border-t-4 border-purple-400">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl p-4 mb-4 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl">🎵</span>
                <h3 className="font-bold text-lg">SESLİ VE IŞIKLI ÖZELLIK!</h3>
                <span className="text-3xl">💡</span>
              </div>
              <div className="flex justify-center gap-3 mb-2">
                <span className="text-2xl">🎶</span>
                <span className="text-2xl">💤</span>
                <span className="text-2xl">✨</span>
                <span className="text-2xl">🌙</span>
              </div>
              <p className="text-center text-sm font-semibold">
                Rahatlatıcı sesler ve yumuşak ışıkla huzurlu uykular!
              </p>
            </div>

            <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
              <span className="text-2xl">✨</span> Neden Uyku Arkadaşı Ayıcık?
            </h3>
            <ul className="text-sm text-gray-700 space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span>
                  <strong>Sesli ve ışıklı özellik</strong> - Rahatlatıcı ninni
                  melodileri ve yumuşak ışık
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span>
                  <strong>Yumuşacık peluş</strong> - Premium kalite,
                  hipoalerjenik kumaş
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span>
                  <strong>Güvenli ve dayanıklı</strong> - CE sertifikalı,
                  yıkanabilir
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span>
                  <strong>Huzurlu uyku</strong> - Çocuğunuzun en iyi arkadaşı
                </span>
              </li>
            </ul>
            <div className="mt-4 bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-300 rounded-lg p-4 shadow-md">
              <p className="text-sm text-gray-800 font-bold text-center mb-2">
                🎁 Çocuğunuza en güzel hediye!
              </p>
              <p className="text-xs text-gray-700 text-center">
                Rahat uyku, mutlu sabahlar! Sevimli arkadaşıyla huzurlu geceler
                🌙
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
                  ref={phoneInputRef}
                  type="tel"
                  name="phone"
                  value={formData.phone.replace("+90 ", "")}
                  onChange={handleChange}
                  required
                  className="flex-1 px-2 py-3 text-gray-800 focus:outline-none"
                  placeholder="5XX XXX XX XX"
                />
              </div>
              {phoneError && (
                <p className="text-red-500 text-sm mt-1">⚠️ {phoneError}</p>
              )}
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
                Ürün Seçimi <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {productVariants.map((variant) => {
                  const quantity = productQuantities[variant.id] || 0;
                  return (
                    <div
                      key={variant.id}
                      className={`border-3 rounded-xl overflow-hidden transition-all ${
                        quantity > 0
                          ? "border-purple-500 ring-4 ring-purple-200 shadow-xl"
                          : "border-gray-300"
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={variant.image}
                          alt={variant.name}
                          className="w-full h-24 object-cover"
                        />
                        {quantity > 0 && (
                          <div className="absolute top-1 right-1 bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">
                            {quantity}
                          </div>
                        )}
                      </div>
                      <div
                        className={`p-2 ${quantity > 0 ? "bg-purple-50" : "bg-white"}`}
                      >
                        <p className="text-xs text-center font-semibold text-gray-800">
                          {variant.name}
                        </p>
                        <p className="text-xs font-bold text-purple-600 text-center mt-1">
                          1.499 TL
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(variant.id, -1)}
                            disabled={quantity === 0}
                            className="w-8 h-8 rounded-full bg-red-500 text-white font-bold text-lg flex items-center justify-center hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-bold text-gray-800">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(variant.id, 1)}
                            className="w-8 h-8 rounded-full bg-green-500 text-white font-bold text-lg flex items-center justify-center hover:bg-green-600 transition-all"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {totalQuantity > 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  🛒 Sepetiniz
                </h3>

                <div className="space-y-3 mb-4">
                  {Object.entries(productQuantities)
                    .filter(([_, qty]) => qty > 0)
                    .map(([productId, qty]) => {
                      const variant = productVariants.find(
                        (v) => v.id === productId,
                      );
                      return (
                        <div
                          key={productId}
                          className="bg-white rounded-xl p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={variant?.image}
                              alt={variant?.name}
                              className="w-16 h-16 rounded-lg object-cover border-2 border-purple-200"
                            />
                            <div>
                              <p className="font-bold text-gray-800">
                                {variant?.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {qty} Adet
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleQuantityChange(productId, -1)
                                }
                                className="w-6 h-6 rounded-full bg-red-500 text-white font-bold text-sm flex items-center justify-center hover:bg-red-600 transition-all"
                              >
                                −
                              </button>
                              <span className="font-bold text-purple-600 min-w-[2rem] text-center">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleQuantityChange(productId, 1)
                                }
                                className="w-6 h-6 rounded-full bg-green-500 text-white font-bold text-sm flex items-center justify-center hover:bg-green-600 transition-all"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div className="bg-white rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Ara Toplam ({totalQuantity} ürün)
                    </span>
                    <span className="font-semibold">{totalPrice} TL</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Kargo</span>
                    <span className="font-bold text-green-600">
                      ÜCRETSİZ 🎁
                    </span>
                  </div>
                  {totalOriginalPrice > totalPrice && (
                    <div className="flex justify-between text-sm text-red-500">
                      <span>İndirim</span>
                      <span className="font-semibold">
                        -{totalOriginalPrice - totalPrice} TL
                      </span>
                    </div>
                  )}
                  <div className="border-t-2 border-purple-200 pt-3 flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-800">
                      Toplam
                    </span>
                    <div className="text-right">
                      {totalOriginalPrice > totalPrice && (
                        <p className="text-sm text-gray-400 line-through">
                          {totalOriginalPrice} TL
                        </p>
                      )}
                      <p className="font-bold text-2xl text-purple-600">
                        {totalPrice} TL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ödeme Yöntemi <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                    formData.paymentMethod === "cash"
                      ? "border-purple-500 bg-purple-50 ring-2 ring-purple-200"
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
                  <div className="text-center">
                    <div className="text-3xl mb-2">💵</div>
                    <p
                      className={`font-bold text-sm ${
                        formData.paymentMethod === "cash"
                          ? "text-purple-700"
                          : "text-gray-700"
                      }`}
                    >
                      Kapıda Nakit
                    </p>
                  </div>
                </label>
                <label
                  className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                    formData.paymentMethod === "card"
                      ? "border-purple-500 bg-purple-50 ring-2 ring-purple-200"
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
                  <div className="text-center">
                    <div className="text-3xl mb-2">💳</div>
                    <p
                      className={`font-bold text-sm ${
                        formData.paymentMethod === "card"
                          ? "text-purple-700"
                          : "text-gray-700"
                      }`}
                    >
                      Kapıda Kart
                    </p>
                  </div>
                </label>
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
