import { useNavigate } from "react-router-dom";
import { OutlinedButton, PageTitle } from "../Components";
import illustration from "../assets/images/illustrations/404.png";
const Wrapper = ({ children }) => {
  return <div className="my-4">{children}</div>;
};
export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-center">
      <img
        src={illustration}
        alt="ressource not found"
        className="w-full md:w-2/3"
      />
      <aside className="w-full md:w-1/3 flex flex-col md:block">
        <PageTitle color="text-primary-300">Oooooops !</PageTitle>
        <Wrapper>
          <PageTitle>
            You got lost in this vast
            <span className="text-primary-300 text-2xl"> universe </span> !
          </PageTitle>
        </Wrapper>
        <OutlinedButton
          title="Go back to base"
          onClick={(_) => {
            navigate("/");
          }}
        />
      </aside>
    </div>
  );
};
