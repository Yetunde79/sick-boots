import Link from "next/link";
import Reset from "../components/Reset";

const reset = (props) => (
  <div>
    <Reset resetToken={props.query.resetToken} />
  </div>
);

export default reset;
