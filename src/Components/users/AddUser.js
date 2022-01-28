import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../../services";
import { Input, Modal, PrimaryButton, Select } from "..";

const AddUserInner = ({ setOpen, setLoading, loading, finalFunc }) => {
  const [gender, setGender] = useState({
    label: "MALE",
    value: "MALE",
  });
  const [user, setUser] = useState({
    label: "YES",
    value: true,
  });
  const [admin, setAdmin] = useState({
    label: "NO",
    value: false,
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  }); //form validation
  return (
    <form
      onSubmit={handleSubmit(async (formData) => {
        try {
          if (loading) return;
          setLoading(true);
          const role = [];
          if (user?.value) {
            role.push("USER");
          }
          if (admin?.value) {
            role.push("ADMIN");
          }
          if (role.length === 0) throw Error("Select a role");
          const aux = {
            ...formData,
            gender: {
              name: gender.value,
            },
            role,
          };
          await createUser(aux);
          finalFunc();
          setOpen(false);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError("email", {
            message: error?.message,
            type: "manual",
          });
        }
      })}
    >
      <Input
        label="E-mail"
        name="email"
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
        underText="Provide a valid email format"
        required
      />
      <Input
        label="First Name"
        name="first_name"
        error={errors?.first_name ? "Required" : ""}
        register={register}
        required
      />
      <Input
        label="Last Name"
        name="last_name"
        error={errors?.last_name ? "Required" : ""}
        register={register}
        required
      />
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
      <Select
        label="Save As User"
        selected={user}
        setSelected={setUser}
        options={[
          {
            label: "YES",
            value: true,
          },
          {
            label: "NO",
            value: false,
          },
        ]}
      />
      <Select
        label="Save as Admin"
        selected={admin}
        setSelected={setAdmin}
        options={[
          {
            label: "YES",
            value: true,
          },
          {
            label: "NO",
            value: false,
          },
        ]}
      />
      <Input
        label="Password"
        password
        name="password"
        type="password"
        error={
          errors?.password?.type === "required"
            ? "Required"
            : errors?.password?.type === "minLength"
            ? "Minimum not reached"
            : errors?.password?.type === "pattern"
            ? "Directives not respected"
            : ""
        }
        register={register}
        underText="Password of a minimum of 6 characters (at least an a uppercase, a lowercase, a number)"
        pattern={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&-+]{6,}$/}
        minLength={6}
        required
      />
      <div className="w-full flex justify-end">
        <PrimaryButton
          title="Add"
          type="primary"
          disabled={loading}
          loading={loading}
        />
      </div>
    </form>
  );
};

export const AddUser = ({ open, setOpen, finalFunc }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      isOpen={open}
      setIsOpen={(_) => {
        setOpen(!open);
      }}
      title="Create an account"
      disabled={loading}
      key="add-quiz-modal"
      maxWidth="50%"
    >
      <AddUserInner
        loading={loading}
        setLoading={setLoading}
        setOpen={setOpen}
        finalFunc={finalFunc}
      />
    </Modal>
  );
};
