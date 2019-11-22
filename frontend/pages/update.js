import Link from "next/link";
import UpdateItem from "../components/UpdateItem";

const Update = props => (
  <div>
    <UpdateItem id={props.query.id} />{" "}
  </div>
);

export default Update;
