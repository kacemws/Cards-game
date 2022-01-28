import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../data";
import { Menu, Loader, MyAccout } from "../Components";
import { ArrowSmLeftIcon } from "@heroicons/react/outline";
import { getUserInformations } from "../services";

export const Profile = () => {
  const [selectedMenu, setSelectedMenu] = useState("my-account");
  const [responsiveMenu, setResponsiveMenu] = useState(true);
  const [loading, setLoading] = useState(true);
  const [, dispatchUser] = useAtom(userAtom);
  const backIcon = (
    <ArrowSmLeftIcon
      className="w-6 mr-2 block sm:hidden cursor-pointer hover:opacity-50"
      onClick={() => setResponsiveMenu(true)}
    />
  );
  const menuData = [
    {
      label: "My account",
      key: "my-account",
      component: <MyAccout setLoading={setLoading} backIcon={backIcon} />,
    },
  ];

  useEffect(() => {
    getUserInformations().then(({ data }) => {
      dispatchUser(data);
      setLoading(false);
    });
  }, [dispatchUser]);

  return (
    <>
      {loading ? (
        <Loader fullScreen />
      ) : (
        <div className="min-h-full w-full overflow-x-hidden">
          <div className="h-full bg-white grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-md outline-none ring-2 ring-gray-200 shadow">
            <div
              className={`bg-white col-span-1 p-6 rounded-md rounded-r-none ring-2 ring-gray-200 ${
                responsiveMenu ? "block" : "hidden"
              } sm:block`}
            >
              <Menu
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
                setResponsiveMenu={setResponsiveMenu}
                data={menuData}
              />
            </div>
            <div
              className={`bg-white col-span-2 p-6 rounded-md ${
                responsiveMenu ? "hidden" : "block"
              } sm:block`}
            >
              {
                menuData.filter((element) => element?.key === selectedMenu)[0]
                  ?.component
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};
