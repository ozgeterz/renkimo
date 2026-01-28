import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="mt-auto w-full max-w-[390px] mx-auto px-6 py-4">
      <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
        <Link to="/kvkk" className="hover:text-gray-600 transition-colors">
          KVKK
        </Link>
        <span>·</span>
        <Link
          to="/aydinlatma-metni"
          className="hover:text-gray-600 transition-colors"
        >
          Aydınlatma Metni
        </Link>
      </div>
    </div>
  );
}

export default Footer;
