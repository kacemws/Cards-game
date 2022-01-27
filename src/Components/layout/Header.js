import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../data";
import { Heading, Login, PrimaryButton, Signup, Title } from "..";
import { UserIcon } from "@heroicons/react/outline";
import logo from "../../assets/images/logo.png";

const Item = ({ title, path }) => {
  const navigate = useNavigate();

  return (
    <div
      className="mx-2 cursor-pointer"
      onClick={() => {
        navigate(path);
      }}
    >
      <Heading color="text-primary-500">{title}</Heading>
    </div>
  );
};

const StockHeader = ({ ...props }) => {
  const position = "sticky top-0 z-50";
  const size = "w-100 h-20 min-h-[5rem] px-4";
  const items = "flex items-center justify-between";
  const bg = "bg-neutral-200";
  const [glass, setGlass] = useState("");

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const navigate = useNavigate();

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position !== 0)
      setGlass(
        "bg-clip-border backdrop-blur-xl bg-opacity-60 border-y border-gray-200"
      );
    else setGlass("");
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    window.addEventListener("scroll", handleScroll, false);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const [roles, setRoles] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (![null, undefined, ""].includes(token)) {
      setLoggedIn(true);
    } else setLoggedIn(false);
  }, [token]);

  useEffect(() => {
    setRoles(user?.roles?.map(({ name }) => name) ?? []);
  }, [user]);

  const logout = async () => {
    navigate("/");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser({});
  };

  return (
    <>
      <header className={`${position} ${size} ${items} ${bg} ${glass} `}>
        <div
          className="flex items-center cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <img src={logo} alt="app's logo" className="h-10 w-10" />
          <div className="mx-1" />
          <Title>LETSCARD</Title>
        </div>
        <div className="flex items-center">
          {roles.includes("ADMIN") && (
            <>
              <Item title="Games" path="/" />
              <Item title="Users" path="/users/all" />
            </>
          )}
          {Object.keys(user).length !== 0 && (
            <UserIcon
              className="h-8 w-8 text-primary-500 mx-4 cursor-pointer"
              onClick={() => {
                navigate("/profile");
              }}
            />
          )}
          {loggedIn ? (
            <PrimaryButton title="Sign out" onClick={logout} />
          ) : (
            <>
              <PrimaryButton
                title="Sign in"
                onClick={(_) => {
                  setLoginOpen(true);
                }}
                style={{
                  margin: "0 1rem",
                }}
              />
              <PrimaryButton
                title="Start Playing now"
                onClick={(_) => {
                  setSignupOpen(true);
                }}
              />
            </>
          )}
        </div>
      </header>
      <Login open={loginOpen} setOpen={setLoginOpen} />
      <Signup open={signupOpen} setOpen={setSignupOpen} />
    </>
  );
};
export const Header = React.memo(StockHeader);
