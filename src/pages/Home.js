import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeDescription,
  HomeImage,
  Loader,
  OutlinedButton,
  PageTitle,
} from "../Components";
import ready from "../assets/images/illustrations/ready.png";
import topOfBooks from "../assets/images/illustrations/top-of-books.png";
import universe from "../assets/images/illustrations/universe.png";
import topStripe from "../assets/images/shapes/centred-shape.svg";
import bottomStripes from "../assets/images/shapes/bottom-stripes.svg";
import circle from "../assets/images/shapes/half-circle.svg";
import bottom from "../assets/images/shapes/bottom.svg";

export const Home = ({ ...props }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <Loader fullScreen />
      ) : (
        <div className="min-h-full w-full overflow-x-hidden">
          <section className="flex flex-col md:flex-row justify-between items-center my-4">
            <img src={topStripe} className="absolute -right-0" alt="stripe" />
            <HomeDescription
              title="Playing Cards was never this easy !"
              description="Multiple free and enjoyable games at the tips of your hand, what are you waiting for ?"
              buttonContent="Start Playing Now !"
              x={-200}
            />
            <HomeImage
              img={ready}
              title="Playing Cards was never this easy !"
              x={200}
            />
          </section>
          {/* ********* */}
          <section className="flex flex-col md:flex-row justify-between items-center my-12">
            <img src={bottomStripes} className="absolute left-0" alt="stripe" />
            <img src={circle} className="absolute right-0" alt="stripe" />
            <HomeImage
              img={topOfBooks}
              title="Best in-game simulation"
              x={-200}
            />
            <HomeDescription
              title="Never felt this real !"
              description={
                "We offer you the possibility the play the games like they were in real life ! A simulation game never felt this real !"
              }
              x={200}
            />
          </section>
          {/* ********* */}
          <section className="flex flex-col justify-center items-center my-4">
            <img src={bottom} className="absolute right-0" alt="stripe" />
            <HomeImage
              img={universe}
              title="What are you waiting for ?"
              y={100}
            />
            <PageTitle>
              What are you waiting for ? Jump in this new world !
            </PageTitle>
          </section>
          {/* ********* */}
          <div className="py-4 w-full flex items-center justify-center">
            <OutlinedButton
              title="Discover our games"
              onClick={(_) => {
                navigate("/games/all");
              }}
            />
          </div>
        </div>
      )}
      )
    </>
  );
};
