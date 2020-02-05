import Link from "next/link";
import SignUp from "../components/Signup";
import SignIn from "../components/Signin";
import styled from "styled-components";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignUpPage = props => (
  <Columns>
    <SignUp />
    <SignIn />
  </Columns>
);

export default SignUpPage;
