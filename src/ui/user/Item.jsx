import { useState } from "react";
import Modal from "../../ui/shared/Modal";

export default function Item({ data }) {
  const { image, description, categoryName } = data;
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpen(!isOpen)}
        className="p-5 space-y-5 w-full bg-white shadow-md border-gray-200 md:duration-500 md:hover:scale-105 md:hover:shadow-xl"
      >
        <div className="w-auto">
          <img src={image} alt="imageCategory" className="w-1/2 mx-auto" />
        </div>
        <h1 className="text-center text-xl">{categoryName}</h1>
        <p className="text-base">{description}</p>
      </div>
      {isOpen && (
        <Modal title="Select a year" onClose={() => setOpen(!isOpen)}></Modal>
      )}
    </>
  );
}
