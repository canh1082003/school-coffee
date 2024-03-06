import iconFacebook from "../../../img/icon/294685_facebook_icon.svg";
import iconGoogle from "../../../img/icon/294675_google_icon.svg";
export default function Social() {
  return (
    <div className="flex justify-around ">
      <img
        className="cursor-pointer  hover:opacity-50  "
        src={iconFacebook}
        alt=""
      />
      <img
        className="cursor-pointer hover:opacity-50  "
        src={iconGoogle}
        alt=""
      />
    </div>
  );
}
