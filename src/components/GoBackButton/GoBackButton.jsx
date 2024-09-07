import { Link } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
export default function GoBackButton({ to, children }) {
  return (
    <Link to={to}>
      <TbArrowBackUp size="36" />
      {children}
    </Link>
  );
}
