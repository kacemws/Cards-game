import { useEffect, useState } from "react";
import {
  Loader,
  NoContent,
  Table,
  TertiaryButton,
  AddUser,
  Pagination,
} from "../Components";
import { exportCsv, getAllUsers, manageBan, totalPages } from "../services";
import { DocumentDownloadIcon, UserAddIcon } from "@heroicons/react/outline";

export const Users = ({ ...props }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [innerLoading, setInnerLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  // add user
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllUsers(0, 10).then(({ users, count }) => {
      setUsers(users);
      setCount(count);
      setLoading(false);
      setInnerLoading(false);
    });
  }, []);

  const paginate = async (page) => {
    setInnerLoading(true);
    const { users, count } = await getAllUsers(page - 1, 10);
    setUsers(users);
    setCount(count);
    setPage(page - 1);
    setInnerLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loader fullScreen />
      ) : (
        <div className="min-h-full w-full overflow-x-hidden">
          <div className="w-full h-16 flex items-center justify-end">
            <UserAddIcon
              className={`h-8 w-8 text-primary-500 cursor-pointer mx-2`}
              onClick={async () => {
                if (loading || innerLoading) return;
                setOpen(true);
              }}
            />
            <DocumentDownloadIcon
              className={`h-8 w-8 text-primary-500 cursor-pointer`}
              onClick={async () => {
                if (loading || innerLoading) return;
                setInnerLoading(true);
                await exportCsv();
                setInnerLoading(false);
              }}
            />
          </div>
          {count === 0 ? (
            <>
              <NoContent
                title="Huuuummm !"
                message="Where did the users"
                highlight="hide"
                buttonTitle="Add one !"
                clickEvent={(_) => {
                  setOpen(true);
                }}
              />
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-full px-2">
                <Table
                  innerLoading={innerLoading}
                  dataSource={users.map((user) => {
                    let roles = "";
                    user.roles.forEach((element, index) => {
                      roles += `${element?.name}${
                        index !== user?.roles?.length - 1 ? " - " : " "
                      }`;
                    });
                    return {
                      ...user,
                      roles,
                      gender: user?.gender?.name,
                    };
                  })}
                  columns={[
                    {
                      title: "First Name",
                      dataIndex: "first_name",
                    },
                    {
                      title: "Last Name",
                      dataIndex: "last_name",
                    },
                    {
                      title: "Email Address",
                      dataIndex: "email",
                    },
                    {
                      title: "Gender",
                      dataIndex: "gender",
                      render: (row) => {
                        const gender = row.gender === "MALE" ? "M" : "F";
                        return (
                          <div
                            className={`h-10 w-10 rounded flex items-center justify-center ${
                              gender === "M"
                                ? "bg-secondary-300"
                                : "bg-rose-200"
                            }`}
                          >
                            {gender}
                          </div>
                        );
                      },
                    },
                    {
                      title: "Roles",
                      dataIndex: "roles",
                    },
                    {
                      title: "Ban Status",
                      dataIndex: "banned",
                      render: (row) => {
                        return (
                          <div
                            className={`h-8 w-fit rounded-full px-2 flex items-center justify-center ${
                              row?.banned ? "bg-rose-400" : "bg-green-400"
                            } text-xs font-bold text-gray-50`}
                          >
                            {row?.banned ? "Banned" : "Not Banned"}
                          </div>
                        );
                      },
                    },
                    {
                      title: "Actions",
                      dataIndex: "actions",
                      render: (row) => {
                        return (
                          <TertiaryButton
                            disabled={innerLoading}
                            loading={loading}
                            title={`${row?.banned ? "Unban user" : "Ban user"}`}
                            onClick={async (_) => {
                              setInnerLoading(true);
                              await manageBan(row?.id);
                              await paginate(page);
                              setInnerLoading(false);
                            }}
                          />
                        );
                      },
                    },
                  ]}
                />
              </div>
              <div className="mt-4 mb-2">
                <Pagination
                  currentPage={page + 1}
                  pageNumbers={totalPages(10, count)}
                  setCurrentPage={paginate}
                />
              </div>
            </div>
          )}
          <AddUser
            open={open}
            setOpen={setOpen}
            finalFunc={() => paginate(page)}
          />
        </div>
      )}
    </>
  );
};
