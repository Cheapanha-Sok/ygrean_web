import Modal from "../../../../ui/shared/Modal";

export default function Choice({ data, onClose }) {
  return (
    <Modal onClose={onClose} title="Choice">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-2 text-white p-5 capitalize"
        >
          <p>choicename : {item.name}</p>
          <p>iscorrect : {item.is_correct ? "true" : "false"}</p>
        </div>
      ))}
    </Modal>
  );
}
