import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Modal, OutlinedButton, Select } from "..";
import { signup } from "../../services";

const SignupInner = ({ setOpen, setLoading, loading }) => {
  const [gender, setGender] = useState({
    label: "MALE",
    value: "MALE",
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
          const aux = {
            ...formData,
            gender: {
              name: gender.value,
            },
            role: ["USER"],
          };
          console.log({ aux });
          await signup(aux);
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
        underText="Protect yourself with a password of a minimum of 6 characters (at least an a uppercase, a lowercase, a number)"
        pattern={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&-+]{6,}$/}
        minLength={6}
        required
      />
      <div className="w-full flex justify-end">
        <OutlinedButton
          title="Signup"
          type="primary"
          disabled={loading}
          loading={loading}
        />
      </div>
    </form>
  );
};

export const Signup = ({ open, setOpen }) => {
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
      <SignupInner
        loading={loading}
        setLoading={setLoading}
        setOpen={setOpen}
      />
    </Modal>
  );
};
