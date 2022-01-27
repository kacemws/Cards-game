import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Modal, OutlinedButton } from "..";
import { signin } from "../../services";

const LoginInner = ({ setOpen, setLoading, loading }) => {
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
          const aux = { ...formData };
          console.log({ aux });
          await signin(aux);
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
        required
      />
      <Input
        label="Password"
        password
        name="password"
        type="password"
        error={errors?.password?.type === "required" ? "Required" : ""}
        register={register}
        minLength={6}
        required
      />
      <div className="w-full flex justify-end">
        <OutlinedButton
          title="Login"
          type="primary"
          disabled={loading}
          loading={loading}
        />
      </div>
    </form>
  );
};

export const Login = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      isOpen={open}
      setIsOpen={(_) => {
        setOpen(!open);
      }}
      title="Login"
      disabled={loading}
      key="add-quiz-modal"
      maxWidth="50%"
    >
      <LoginInner loading={loading} setLoading={setLoading} setOpen={setOpen} />
    </Modal>
  );
};
