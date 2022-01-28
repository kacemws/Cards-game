import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { PrimaryButton, Input, Modal, Heading, Body, Select } from "../";
import { useAtom } from "jotai";
import { userAtom } from "../../data";
import { updateUser } from "../../services";

const Item = ({ label, text, onClick = () => {} }) => {
  return (
    <div className="flex justify-between mb-8">
      <div className="flex flex-col w-3/5 sm:w-max mb-2">
        <Heading>{label}</Heading>
        <Body>{text}</Body>
      </div>
      <div>
        <PrimaryButton title="Edit field" onClick={onClick} />
      </div>
    </div>
  );
};

export const MyAccout = () => {
  const [user, setUser] = useAtom(userAtom);

  const [gender, setGender] = useState({
    label: user?.gender?.name,
    value: user?.gender?.id,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: "onChange",
  });
  const MODAL_TITLES = {
    first_name: "Change your first name",
    email: "Change your email address",
    last_name: "Change your last name",
    gender: "Update your gender",
  };
  const [selectedField, setSelectedField] = useState("");
  const [editOpen, setEditOpen] = useState(false);

  const [innerLoading, setInnerLoading] = useState(false);

  return (
    <>
      <Item
        label={"E-mail"}
        text={user?.email}
        onClick={() => {
          setSelectedField("email");
          setEditOpen(true);
        }}
      />
      <Item
        label={"First Name"}
        text={user?.first_name}
        onClick={() => {
          setSelectedField("first_name");
          setEditOpen(true);
        }}
      />
      <Item
        label={"Last Name"}
        text={user?.last_name}
        onClick={() => {
          setSelectedField("last_name");
          setEditOpen(true);
        }}
      />
      <Item
        label={"Gender"}
        text={user?.gender?.name}
        onClick={() => {
          setSelectedField("gender");
          setEditOpen(true);
        }}
      />
      <Modal
        isOpen={editOpen}
        setIsOpen={setEditOpen}
        title={MODAL_TITLES[selectedField]}
        button={false}
      >
        <form
          onSubmit={handleSubmit(async (formData) => {
            try {
              if (innerLoading) return;
              setInnerLoading(true);
              console.log({ gender });
              const aux = {
                ...user,
                ...formData,
                gender: {
                  name: gender?.label,
                },
              };

              const data = await updateUser(aux);
              console.log({ data });
              setUser(data);
              setEditOpen(false);
              setInnerLoading(false);
            } catch (error) {
              setInnerLoading(false);
              setError("email", {
                message: error?.message,
                type: "manual",
              });
            }
          })}
        >
          {selectedField === "first_name" && (
            <Input
              name="first_name"
              register={register}
              defaultValue={user?.first_name}
              required
              error={errors?.first_name ? "Required" : ""}
            />
          )}
          {selectedField === "last_name" && (
            <Input
              name="last_name"
              register={register}
              defaultValue={user?.last_name}
              required
              error={errors?.last_name ? "Required" : ""}
            />
          )}

          {selectedField === "email" && (
            <Input
              name="email"
              type="email"
              defaultValue={user?.email}
              error={
                errors?.email
                  ? errors?.email?.message
                    ? errors?.email?.message
                    : errors?.email?.type === "required"
                    ? "Required"
                    : errors?.email?.type === "pattern"
                    ? "Invalid format"
                    : ""
                  : ""
              }
              register={register}
              pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
              required
            />
          )}
          {selectedField === "gender" && (
            <Select
              label="Gender"
              selected={gender}
              setSelected={setGender}
              options={[
                {
                  label: "MALE",
                  value: "MALE",
                },
                {
                  label: "FEMALE",
                  value: "FEMALE",
                },
              ]}
            />
          )}
          <div className="mt-4">
            <div className="w-full flex justify-end">
              <PrimaryButton title="Save changes" loading={innerLoading} />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};
