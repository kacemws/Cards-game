import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../data";
import { Modal, Loader, OutlinedButton, PrimaryButton } from "..";
import { changeStatus } from "../../services";
import { useNavigate } from "react-router-dom";

const ConfirmChange = ({ close, game, finalFunc }) => {
  const [loading, setLoading] = useState(false);
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  console.log({ user });

  return (
    <div className="h-28 w-full flex justify-end items-end">
      <OutlinedButton
        title="Confirm"
        type="primary"
        disabled={loading}
        loading={loading}
        onClick={async (_) => {
          setLoading(true);
          await changeStatus({
            ...game,
            status: game?.status?.name,
          });
          await finalFunc();
          setLoading(false);
          close();
        }}
      />
      {user?.roles?.map(({ name }) => name).includes("USER") && (
        <>
          <div className="w-2" />
          <PrimaryButton
            title="Play the game"
            type="primary"
            disabled={loading}
            loading={loading}
            onClick={async (_) => {
              navigate(`/games/all/${game?.id}`);
            }}
          />
        </>
      )}
    </div>
  );
};

export const ChangeVisibility = ({ open, setOpen, game, finalFunc }) => {
  const steps = {
    1: <ConfirmChange close={setOpen} game={game} finalFunc={finalFunc} />,
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Modal
      isOpen={open}
      setIsOpen={(_) => {
        setOpen(!open);
      }}
      title={`Do you want to ${
        game?.status?.name === "OPEN" ? "hide" : "show"
      } the game ?`}
      key="visibility-modal"
      onClose={(_) => {}}
    >
      {loading ? <Loader /> : <>{steps[1]}</>}
    </Modal>
  );
};
