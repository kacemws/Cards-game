import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, Modal, OutlinedButton } from "..";
import { createRoom } from "../../services";

const StartRoomInner = ({ close, game, loading, setLoading }) => {
  const navigate = useNavigate();
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
          const aux = { ...formData, game: game?.id };
          if (Number.parseInt(aux.number_of_rounds) <= 0) {
            throw new Error("Minimum number of round is 1");
          }
          const {
            data: { id },
          } = await createRoom({
            ...aux,
          });
          close(false);
          setLoading(false);
          navigate(`/games/all/${game?.id}/play/${id}`);
        } catch (error) {
          setLoading(false);
          setError("number_of_rounds", {
            message: error?.message,
            type: "manual",
          });
        }
      })}
    >
      <Input
        label=""
        type="number"
        name="number_of_rounds"
        error={
          errors?.number_of_rounds
            ? errors?.number_of_rounds?.message
              ? errors?.number_of_rounds?.message
              : errors?.number_of_rounds?.type === "required"
              ? "Required"
              : ""
            : ""
        }
        defaultValue={1}
        register={register}
        required
      />
      <div className="w-full flex justify-end">
        <OutlinedButton
          title="Play"
          type="primary"
          disabled={loading}
          loading={loading}
        />
      </div>
    </form>
  );
};

export const StartRoom = ({ open, setOpen, game }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      isOpen={open}
      setIsOpen={(_) => {
        if (loading) return;
        setOpen(!open);
      }}
      title={`Number of rounds`}
      key="game-modal"
      disabled={loading}
      onClose={(_) => {}}
    >
      <>
        <StartRoomInner
          close={setOpen}
          game={game}
          loading={loading}
          setLoading={setLoading}
        />
      </>
    </Modal>
  );
};
