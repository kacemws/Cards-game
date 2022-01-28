import { useState, useEffect } from "react";

import { Modal, Loader, OutlinedButton } from "..";
import { changeStatus } from "../../services";

const ConfirmChange = ({ close, game }) => {
  const [loading, setLoading] = useState(false);

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
          setLoading(false);
          close();
        }}
      />
    </div>
  );
};

export const ChangeVisibility = ({ open, setOpen, game }) => {
  const steps = {
    1: <ConfirmChange close={setOpen} game={game} />,
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
