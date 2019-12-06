import Items from "../components/Items";

const Home = props => (
  <div>
    <Items page={parseFloat(props.query.page) || 1} />
    {/*page num from url*/}
  </div>
);

export default Home;
